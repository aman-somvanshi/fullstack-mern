const {Router} = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({userId: req.userId});

    res.status(200).json({
        balance: account.balance
    });
})

accountRouter.post("/transfer",authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount, to} = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // Perform the transfer
    await Account.updateOne({userId: req.userId}, { $inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, { $inc: {balance: amount}}).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    });

})

module.exports = accountRouter;
