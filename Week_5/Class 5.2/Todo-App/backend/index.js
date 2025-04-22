const express = require("express");
const app = express();
const {createTodo, updateTodo} = require("./types");
const { todo } = require("./db");
const cors = require("cors")

app.use(express.json());
app.use(cors({
    // origin: "http://localhost:5173"
    origin: "*"  // allows requests from anywhere
}));

// body {
//     title: string,
//     description: string
// }
app.post( "/todo" ,async (req, res) => {

    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong input"
        })
        return;
    }

    // else put it in mongoDB
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    }) // It's not necessary to do await here. 90% of the time, it would be ok, however it may happen that at some instance the db is down, then this wouldn't work but you would still be responding back "Todo created" to the user. SO yeah, use await.

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async (req, res) => {

    const allTodos = await todo.find({});
    // Here, if you don't do await, a promise is instantly returned and you can't do anything with it. SO you must await for the promise to be resolved.

    res.json({
        allTodos
    })
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if(!parsedPayload) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })
    
    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);