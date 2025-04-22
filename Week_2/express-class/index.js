//class 2_5
// creating an http server
// express
// node default library => no

//npm install express
// const express = require("express");

// const app = express(); // creating an object of express



// app.get("/", function(req, res){
    // const n = req.query.n;
// })

// app.listen(3000);

// Here , we have created an in-memory database of users.
const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

const express = require("express");

const app = express();


app.get("/", function(req, res){
    //Getting the number of kidneys of the user and the number of healthy and unhealthy kidneys
    const johnKidneys  = users[0].kidneys;
    const noOfKidneys = johnKidneys.length;
    //filter in js can also be used here
    let noOfHealthyKidneys = 0;
    for(let i=0;i<noOfKidneys;i++){
        if(johnKidneys[i].healthy)
            noOfHealthyKidneys++;
    }
    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;
    res.json({
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })
})

app.use(express.json());
app.post("/", function(req, res){
    //Adding a new kidney to the user
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done !"
    })
})

app.put("/", function (req, res) {
    //Replacing all the unhealthy kidneys with healthy kidneys
    if(isThereAtleastOneUnhealthyKidney()){
        const johnKidneys = users[0].kidneys;
        for(let i=0;i<johnKidneys.length;i++){
            johnKidneys[i].healthy = true;
        }
        res.json({});
    }
    else{
        res.status(411).json({
            msg : "There are no unhealthy kidneys to replace"
        })
    }    
})

app.delete("/", function(req, res){
    //Deleting all the unhealthy kidneys
    //if the user doesn't have any unhealthy kidneys, then we are supposed to send back 411 status code
    
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true,
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "Done !!!"
        })
    }
    else{
        res.status(411).json({
            msg : "You have no unhealthy kidneys"
        })
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
            break;
        }
    }
    return atleastOneUnhealthyKidney;
}
app.listen(3000);