const express = require("express");
const bodyParser = require("body-parser");
const router = require("./server/routes/user");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use("/api/v1", router);

app.listen(6000, () => {
    console.log("Server is running on port 6000.");
})