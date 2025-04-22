// Fetch, Authentication and Databases

//PART - 1 => FETCH API

// Refer to index.html for this part




//PART - 2 => AUTHENTICATION


// 1. Hashing

// converting a simple string to a complicated gibberish string such that when the same simple string is passed again, the gibberish string is the same 

// it is a one way function - you can't convert the gibberish string back to the simple string

// at the time of registration, we hash the password and store it in the database and at the time of login, we hash the password and compare it with the hashed password in the database

// 2. Encryption

// converting a simple string to a gibberish string and then converting it back to the simple string

// it is a two way function that uses a key to encrypt and decrypt the string

// the gibberish string can be decoded only by the person who has the key

// 3. JWT - JSON Web Token

// it's neither hashing nor encryption , rather it is technically a digital signature  

// it takes a json as an input and converts it to a long string which is a token

// this token can be converted back to the json

// so it  is some input converted into an output. "Anyone" who has the output can actually see the input as well

// so token can be decoded by anyone but it can be verified only by those who have the password

//  json object --> jwt.encode() --> token
//  on the chatgpt server,
//  token --> jwt.verify() with the password ---> original json object

// 4. Local Storage
// the token is stored in the local storage of the browser and is sent to the server with every request. When you log out, the token is deleted from the local storage



// ASSIGNMENT -- 

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const jwtPassword = "123456";

// const app = express();

// const ALL_USERS = [
//   {
//     username: "harkirat@gmail.com",
//     password: "123",
//     name: "harkirat singh",
//   },
//   {
//     username: "raman@gmail.com",
//     password: "123321",
//     name: "Raman singh",
//   },
//   {
//     username: "priya@gmail.com",
//     password: "123321",
//     name: "Priya kumari",
//   },
// ];

// app.use(express.json());

// function userExists(username, password) {
//   // write logic to return true or false if this user exists
//   // in ALL_USERS array

//   //hard todo - try to use the find function in js

//   let userExists = false;
//   if(ALL_USERS.find(user => username == user.username && password == user.password)){
//     userExists = true;
//   }

//   // for(let i=0;i<ALL_USERS.length;i++){
//   //   if(username == ALL_USERS[i].username && password == ALL_USERS[i].password){
//   //     userExists = true;
//   //   }

//   return userExists;
//   // }
// }

// app.post("/signin", function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (!userExists(username, password)) {
//     return res.status(403).json({
//       msg: "User doesnt exist in our in memory db",
//     });
//   }

//   var token = jwt.sign({ username: username }, jwtPassword);
//   return res.json({
//     token,
//   });
// });

// app.get("/users", function (req, res) {
//   const token = req.headers.authorization;
//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const username = decoded.username;
//     // return a list of users other than this username
    // res.json({
    //   users: ALL_USERS.filter(function(user){
    //     if(user.username != username){
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   })
    // })
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid token",
//     });
//   }

// });

// app.listen(3000)


// PART - 3 => DATABASES

// Until now, we’ve been storing data in memory. This is bad for a few reasons -  
// 1. Data can’t be dynamic, if you update in memory objects, the updates are lost if the process restarts 
// 2. There are multiple servers in the real world

// In the real world, a basic architecture looks like this
// Browser->Backend->Database
// User hits the backend 
// Backend hits the database 
// User doesn’t have access to the database/can’t talk to the DB

//  There are multiple types of databases -
// 1. SQL - MySQL, Postgres
// 2. NoSQL - MongoDB, Redis
// 3. Graph - Neo4j

// MongoDB lets you create databases 
// In each DB, it lets you create tables (collections) 
// In each table, it lets you dump JSON data 
// It is schemaless 
// It scales well and is a decent choice for most use cases

// We will use MonoDB Compass to interact

// How does the backend connect to the database? 
// Using libraries! 
// 1. Express lets u create an HTTP server 
// 2. Jsonwebtokens library lets you create jwts 
// 3. Mongoose lets you connect to your database


// ASSIGNMENT - 

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://admin:q66gVhEObKd8xizm@cluster0.hw58q.mongodb.net/user_app",
);

const User = mongoose.model("users", {
  name: String,
  email: String,
  password: String,
});

const app = express();  
app.use(express.json());

app.post("/signup", async function(req, res) {
  const username = req.body.username;
  const password= req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({
    email: username,
  });

  if(existingUser){
    return res.status(400).send("User already exists");
  }

  const user = new User({
    name: name,
    email: username,
    password: password,
  })

  user.save();

  res.json({
    "msg" : "User created successfully"  
  })
})

// function userExists(username, password) {
//   let userExists = false;
//   if(ALL_USERS.find(user => username == user.email && password == user.password)){
//     userExists = true;
//   }
//   return userExists;
// }

// app.post("/signin", async function (req, res) {
//   const username = req.body.email;
//   const password = req.body.password;

//   if (!userExists(username, password)) {
//     return res.status(403).json({
//       msg: "User doesnt exist in our in memory db",
//     });
//   }

//   var token = jwt.sign({ email: username }, jwtPassword);
//   return res.json({
//     token,
//   });
// });

// app.get("/users", function (req, res) {
//   const token = req.headers.authorization;
//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const username = decoded.email;

//     res.json({
//         users: ALL_USERS.filter(function(user){
//         if(user.email != username){
//           return true;
//         }else{
//           return false;
//         }
//       })
//     })
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid token",
//     });
//   }
// });

app.listen(3000);


