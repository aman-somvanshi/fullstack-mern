const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.get("/sum", (req, res) =>{

    const a = req.query.a;
    const b = req.query.b;
    const sum = parseInt(a) + parseInt(b);
    res.send("Sum is : " + sum);
})

app.get("/interest" , (req, res) => {
    const p = req.query.principal;
    const r = req.query.rate;
    const t = req.query.time;

    const interest = (parseInt(p)*parseInt(r)*parseInt(t))/100;
    const amount = parseInt(p) + interest;

    // res.send("Interest is : " + interest);

    res.json({
        total: amount,
        interest: interest
    })
})

const todos = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, eggs, bread, and butter"
    },
    {
      id: 2,
      title: "Clean the house",
      description: "Vacuum and dust all rooms"
    },
    {
      id: 3,
      title: "Finish project",
      description: "Complete the final report and submit it"
    },
    {
      id: 4,
      title: "Workout",
      description: "Go for a run and do some strength training"
    },
    {
      id: 5,
      title: "Call family",
      description: "Catch up with mom and dad"
    },
    {
      id: 6,
      title: "Read a book",
      description: "Finish reading the current chapter"
    },
    {
      id: 7,
      title: "Plan vacation",
      description: "Research destinations and create an itinerary"
    },
    {
      id: 8,
      title: "Prepare presentation",
      description: "Create slides and practice the speech"
    },
    {
      id: 9,
      title: "Meditate",
      description: "Spend 20 minutes on mindfulness meditation"
    },
    {
      id: 10,
      title: "Organize workspace",
      description: "Declutter the desk and arrange files"
    }
];

app.get("/todos", (req, res) => {

    const id = req.query.id? parseInt(req.query.id) : null;
    if(id) {
      const requiredTodo = todos.find(function(todo) {
        if(todo.id === id ){
          return todo;
        }
      })

      return res.json(requiredTodo);
    }
    // const randomLength = Math.floor(Math.random() * todos.length);
    // const randomTodos = todos.slice(0, randomLength);
    // res.json(randomTodos);
})

app.listen(3000);