const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:q66gVhEObKd8xizm@cluster0.hw58q.mongodb.net/todos"); // not the right way
// In a real application, the connection string is stored in a .env file which is not committed to github

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos' , todoSchema);

module.exports = {
    todo: todo
}