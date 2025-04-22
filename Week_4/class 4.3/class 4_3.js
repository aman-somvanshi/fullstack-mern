// Servers are transient or impermanent.
// whereas Databases are permanent.
// Databases are replicated in a cluster of servers so as to ensure that the data is always available and never lost.

// Note - Granular access means giving users very specific and detailed permissions to control what they can or cannot do in a system.

// Good questions to have at this point
// Why don’t we let the user hit the database directly?
// What extra does the http server provide exactly?

// 1. Databases were created using protocols that browsers don’t understand
// 2. Databases don’t have granular access as a first class citizen. Very hard to do user specific access in them
// 3. There are some databases (rebase) that let you get rid of the http server and try their best to provide granular access

// Why do we use servers?
// Because servers do auth checks. They have access to the entire database but they allow a specific user to access only a specific part of the database.

// Databases usually allow access to 4 primitives
// 1. Create Data
// 2. Read Data
// 3. Update Data
// 4. Delete Data
// Popularly known as CRUD

// ORM - Library used to talk to the database

// MongoDB - A Schema-less database
// Schema-less means that you don’t have to define the structure of the data before you start using it. Also, you can insert any type of data in any field of the database.

// Mongoose on the other hand requires you to define the schema of the data before you start using it. This doesn't mean that MongoDB has become strict suddenly. It just means that Mongoose is enforcing a schema on top of MongoDB. You can still insert any data in any field of MongoDB using the MongoDB compass.


// This sounds counter intuitive since mongodb is schemaless?
// That is true, but mongoose makes you define schema for things like autocompletions / Validating data before it goes in the DB to make sure you’re doing things right
// Schemaless DBs can be very dangerous, using schemas in mongo makes it slightly less Dangerous

// SQL doesn't let you put nested data inside a table. But in MongoDB you can put nested data inside a document.

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String, 
    purchasedCourse:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    // We are trying to tell that purchasedCourse is an array of object references to the Course table
})

const CourseSchema = new mongoose.Schema({
    title: String,
    price: 5999
})

const User = mongoose.model('User', UserSchema);
// Above line creates a table called User in the database with the schema UserSchema.
const Course = mongoose.model('Course', CourseSchema);
// Above line creates a table called Course in the database with the schema CourseSchema.


// CREATE
User.create({
    username: req.body.username,
    password: req.body.password
})

// READ
User.findbyId("1ggfydyrdre544535");
User.findOne({
    username: "aman@gmail.com"
})// Finds one entry with this username
User.find({
    username: "aman123@gmail.com"
})// Finds multiple entries with this username

User.updateOne(
    {"id": "1"},
    {
        "$push" : {
            purchasedCourses : courseId
        }
    }
) // Adds a course to the purchasedCourse array of the user with id 1

User.updateOne({
    id: "1"
}, {
    password: "newPassword"
}) // updates the password of the user with id 1

User.update({}, {
    premium: true
}) // Updates all the users in the database to premium

User.deleteMany({}) // Deletes all the users in the database

User.deleteOne({
    username: "aman@gmail.com"
}) // Deletes the user with the username


// 3 Jargons to know in Databases

// 1. Cluster --> A group of databases 
// 2. Database --> A group of tables
// 3. Table

// For a course selling application , a database would have the following tables -
// 1. Users
// 2. Courses
// 3. Purchases
// 4. Admins --> people who can add data in the courses table


// Now move over to week 3 assignment 03-mongo and then to 04-mongo with jwt

