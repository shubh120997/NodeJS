const express = require("express");
const bodyParser = require("body-parser");
const route1 = require("./src/routes/route.user");
const route2 = require("./src/routes/route.post");
require("dotenv").config();


const port = process.env.port || 5000;

const app = express();
app.use(bodyParser.json());
app.use("/", route1);
app.use("/", route2);
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});