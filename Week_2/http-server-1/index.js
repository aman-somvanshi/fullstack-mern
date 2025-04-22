
const express = require("express");
const app = express();
// const port = 3000;
console.log("PORT: ", process.env.PORT);
const port = process.env.PORT || 3000;
//On powershell, we can set the port by writing $env:PORT = 3001
//On cmd, we can set the port by writing set PORT=3001
const bodyParser = require("body-parser");

//fs.readFile("path", "utf8", ())

app.get("/", function (req, res) {
    // res.send("Hello World!");
    res.send('<b> Hi there ! </b>')
    // Sending back status code
    // res.status(401).send("Unauthorized");

});

//middleware
app.use(bodyParser.json());
app.post("/conversations", function (req, res) {
    console.log(req.body); //This can be done only if we have body parser that is the middleware
    // const message = req.body.message;
    // console.log(message);
    console.log(req.headers["authorization"]);
    res.send({
        msg : '2 +2 = 4'
    })

});

// app.get("/", function (req, res) {
//     console.log("GET request has been made");
//     let a = 0;
//     for(let i = 0; i < 100000000000000000; i++) { //This is a blocking code as js is single threaded
//         a = a+1;
//     }
//   res.send("Hello World!");
// });

app.get("/route-handler", function(req, res){
    //headers, body, query parameters
    // do machine learning model
    res.json({
        name: 'Aman',
        player : 7
    })
})

app.listen(port);
//app.listen() is a function that starts the server. It takes in a port number as an argument.
//port number is a number that is used to identify a process on a machine. It is a 16 bit number. It ranges from 0 to 65535.
// localhost:3000


//Two applications can't run on the same port. So, we can't run two servers on the same port.

// Commands used -
// npm init -y
// npm install express
// node index.js
// npx nodemon index.js
// $env:PORT = 3001

//Query Parameters -
//localhost:3000/route-handler?name=Aman&player=7
//in the above URL, name and player are query parameters. 

// fetch("https://google.com").then(async (s) => {
//     const json = await satisfies.json();
// });

//we use body-parser because express doesn't inherently know what type of data is coming in the request bodies. 

//what is a runtime? - A runtime is a program that runs other programs. It is a program that runs on a computer that is responsible for executing the code of other programs.
// In the context of Node.js, the runtime refers to the environment that allows JavaScript code to be executed outside of a browser. Node.js provides essential components, such as the V8 JavaScript engine, libraries, and APIs that make JavaScript suitable for server-side development and other non-browser environments.

//what is express?
//express is a library that gives u high level constructs to create a http servers

//listen will start the server and it will keep running until we stop it.
// if we comment out the listen function, the server will not start.
// it's similar to just writing the function and not calling it.

