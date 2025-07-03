const {Router} = require("express");
const zod = require("zod");
const argon2 = require("argon2");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = Router();

const signupSchema = zod.object({
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    username: zod.string().email(),
    password: zod.string().min(6)
})


userRouter.post("/signup" , async (req, res) => {

    const body = req.body;

    // const result = signupSchema.safeParse(req.body);
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    } 


    // const dbUser = await User.create(body);
    const dbUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: await argon2.hash(body.password)
    })
    await dbUser.save();

    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })
    
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})



const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

userRouter.post("/signin" , async (req, res) => {
    const body = req.body;

    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username,
    })

    if(!existingUser){
        return res.status(411).json({
            message: "Invalid username"
        })
    }

    const isPasswordValid = await argon2.verify(existingUser.password, body.password);

    if(!isPasswordValid){
        return res.status(411).json({
            message: "Wrong Password"
        })
    }

    const token = jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET);

    return res.status(200).json({
        token: token
    })


})

const updateSchema = zod.object({
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional(),
    password: zod.string().min(6).optional()
})
userRouter.put("/" , authMiddleware, async (req, res) => {
    const body = req.body;

    const {success} = updateSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Wrong inputs"
        })
    }

    if(body.password){
        body.password = await argon2.hash(body.password)
    }

    await User.updateOne({_id: req.userId}, req.body);

    res.status(200).json({
	    message: "Updated successfully"
    })


})



userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const allUsers = await User.find({
        $or: [
            { firstName: {
                '$regex' : filter,
                $options: "i" // used for case-insensitivity
            } },
            { lastName: {
                '$regex' : filter,
                $options: "i" // used for case-insensitivity
            } }
        ]
    })

    res.status(200).json({
        user: allUsers.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;