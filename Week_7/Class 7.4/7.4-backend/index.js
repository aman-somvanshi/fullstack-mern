const express = require('express');

const app = express();

const cors = require('cors');
app.use(express.json());

app.use(cors({
    origin: '*'
}))

app.get("/notifications", (req, res) => {

    const notifications = {
        network : Math.floor(Math.random()*10),
        jobs : Math.floor(Math.random()*10),
        messaging : Math.floor(Math.random()*10),
        notifications : Math.floor(Math.random()*10),
    }

    res.json(notifications);
} )

app.listen(3000);