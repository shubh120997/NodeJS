const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/info', (req, res) => {
    console.log(req.body);
    const details = {
        name : req.body.name,
        email :req.body.email
    };
    console.log(details);
    res.send(details);
    // res.send(`Your name is ${req.body.name} and email is ${req.body.email}.`);
});

app.listen(3000, () => {
    console.log("Server is running on 3000.");
});