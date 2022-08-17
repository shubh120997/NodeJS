const express = require("express");

const routes = require("./src/routes/user.route");

const app = express();

app.use(express.json());

app.use("/api/v3",routes);

app.listen(3000, () => {
    console.log(`Server is up and running`);
});