const express = require("express");
const cors = require("cors");


const app = express();

const corsOption = {
    origin: "https://www.google.com",
    optionSuccessStatus : 200
}
// app.use(cors());
app.get("/", cors(corsOption), (req, res) => {
    res.send("Sucessfully Deployed");
});

app.listen(8000, () => {
    console.log("Server is started at 8000");
});