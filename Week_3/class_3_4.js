const express = require("express");

const app = express();

//function that returns a boolean if the age of the person is more than 14

// function isOldEnough(age){
//     if(age>=14)
//         return true;
//     else
//         return false;
// }

function isOldEnoughMiddleware(req, res, next){
    const userAge = req.query.age;
    if(userAge>=14)
        next();
    else
    res.send("Sorry , you aren't old enough to ride");
}

app.use(isOldEnoughMiddleware);

app.get("/ride1",  (req, res) => {
    res.json({
        msg:  "You can successefully ride the ride 1"
    })
})

app.get("/ride2", (req, res) => {
    res.json({
        msg:  "You can successefully ride the ride 2"
    })
})

app.listen(3000);