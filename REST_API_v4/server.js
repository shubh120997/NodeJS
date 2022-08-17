const express = require("express");
require("dotenv").config();
const userRoutes = require("./src/routes/route.user");
const postRoutes = require("./src/routes/route.post");
const app = express();
app.use(express.json());

app.use("/api/v4", userRoutes);
app.use("/api/v4", postRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is up and running at ${process.env.SERVER_PORT}`);
});