// PART 1 - MIDDLEWARES

// Two prechecks that are done by any real website - 
//  1. Auth - is the user logged in?
//  2. Input validation - is the input valid and correct?  -- making sure that the input expected by the route is provided

const express = require("express");

const app = express();

// app.get("/health-checkup", (req, res) => {
    // const username = req.headers.username;
    // const password = req.headers.password;
    // const kidneyId = req.query.kidneyId;

    // UGLY CODE -

    // if((username === "aman" && password === "pass")){
    //     if(kidneyId == 1 || kidneyId == 2){
    //         //do something with kidney here
    //     res.json({
    //         msg: "Your kidney is fine! "
    //     })
    //     }
    // }

    // res.status(400).json({
    //     msg: "Something is up with your inputs"
    // })

    //This is called early return


    // SLIGHTLY BETTER BUT STILL UGLY CODE - 

    // if(!(username === "aman" && password == "pass")){
    //     res.status(400).json({
    //         msg: "Something is up with your inputs"
    //     })
    //     return;
    // }
    
    // if(kidneyId != 1 && kidneyId != 2){
    //     res.status(400).json({
    //         msg: "Something is up with your inputs"
    //     })
    //     return;
    // }

    // res.json({
    //     msg: "Your kidney is fine! "
    // })


    //middlewares allow us to do user authentication and input validation in a more cleaner way which doesn't violate the DRY principle

    //middlewares are something sitting between the route and the final handler

    //middlewares are just functions that take req, res and next as arguments.
    // next is a function that tells express to move to the next middleware or the final handler

// }   


// GOOD CODE -


// function userMiddleware(req, res, next) {
//     const username = req.headers.username;
//     const password = req.headers.password;
//     const kidneyId = req.query.kidneyId;

//     if(username != "aman" && password != "pass"){
//         res.status(403).json({
//             msg: "Incorrect Inputs",
//         })
//     }
//     else{
//         next();
//     }
// }

// function kidneyMiddleware(req, res, next){
//     if(kidneyId !=1 && kidneyId != 2){
//         res.status(403).json({
//             msg: "Incorrect Inputs",
//         });
//     } else {
//         next();
//     }
// }

// app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
//     //do something with your kidney here
//     res.send("Your kidney is healthy!")
// });

// Just a popular example of a middleware -

// let numberOfRequests = 0;
// function calculateRequests(req, res, next){
//     numberOfRequests++;
//     console.log(numberOfRequests);
//     next();
// }

// app.get("/health-checkup", calculateRequests, (req, res) => {
    
// });

// app.post("/health-checkup2", calculateRequests, (req, res) => {

// });

// as you can see above , we had to write calculateRequests twice. This is where app.use() comes in.

// app.use(calculateRequests);

// app.get("/health-checkup", (req, res) => {
//     res.json({
//         msg: "Hi there"
//     })
// });

// Output on calling the requests thrice - 1
//                                         2                
//                                         3   

// Point to note - even though we are calling the /health-checkup route, the calculateRequests middleware is being called because of app.use(calculateRequests).

// So whatever we pass in app.use() is called for every route below this line.

// Famous example - 
// app.use(express.json());

// app.listen(3000);



// PART 2 -

// app.use(express.json());

// app.post("/health-checkup", (req, res) =>{
//     // kidneys = [1,2]

//     const kidneys = req.body.kidneys;

//     if(!kidneys){
//         res.json({
//             msg: "Incorrect Inputs"
//         })
//         return;
//     }

//     const kidneyLength = kidneys.length;

//     res.send("you have " + kidneyLength + " kidneys");
// })

// // global catches -- put this at the end of the file before app.listen() because it will catch all the errors that are not caught by the previous routes

// let errorCount = 0;
// app.use((err, req, res, next)=>{
//     console.log("Error count: "+ errorCount + err);
//     errorCount++;
//     res.json({
//         msg: "Sorry something is up with the server"
//     })
// })

// app.listen(3000);


//PART- 3 ==> ZOD -- for better input validation

// npm install zod

const zod = require("zod");
// const schema = zod.array(zod.number());

// {
//     email: string => email
//     password: atleast 8 letters
//     country: "IN" ,  "US"
// }

// const schema = zod.object({
//     email: zod.string().email(),
//     password: zod.string().min(8),
//     country: zod.literal("IN").or(zod.literal("US"))
//     kidneys: zod.array(zod.number())
// })

app.use(express.json());

app.post("/health-checkup", (req, res) =>{
    // kidneys = [1,2]

    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    if(!response.success){
        res.status(411).json({
            msg: "Input is invalid"
        })
    }else{
        res.send({
            response
        })
    }    
})

function validateInput(obj){
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const response = schema.safeParse(obj);
    return response;
}

app.post("/login", (req, res) => {
    const response = validateInput(req.body)
    if(!response.success){
        res.json({
            msg: " Your inputs are invalid "
        })
        return;
    }

    res.json({
        msg: "Your inputs are valid"
    })
})

app.listen(3000);


// Doubts -->

const middlewares = [express.json(), calculateRequests, calculateResponses];

app.get("/", ...middlewares, (req, res) => {

});
