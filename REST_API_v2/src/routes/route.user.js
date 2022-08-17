const express = require("express");
const controllerUser = require("../controllers/controller.user");

const router = express.Router();

router.get("/users", controllerUser.all);

router.get("/users/:id", controllerUser.individual);

router.post("/users", controllerUser.add);

router.patch("/users/edituser/:id", controllerUser.edit);

router.delete("/users/deleteuser/:id", controllerUser.delete);


module.exports = router;