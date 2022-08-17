const { Router } = require("express");
const verify = require("../verify");

const controller = require("../controller/user.controller");

const route = Router();

route.post("/register", controller.userRegister);

route.post("/login", controller.userLogin);

route.get("/users", verify.getUserId, controller.getAllUser);

route.post("/forgot", verify.getUserId, controller.forgotPassword);

module.exports = route;