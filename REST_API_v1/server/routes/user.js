const express = require("express");
const validMiddleware = require("../middleware/reqValidation");
const routes = require("../controllers/userController");

const router = express.Router();

router.get('/', routes.viewAllUser);

router.get('/:id', routes.viewUser);

router.post('/create', validMiddleware.validation, routes.createUser);

router.delete('/:id', routes.deleteUser);

module.exports = router;