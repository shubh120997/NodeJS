const {Router} = require("express");
const {isUser, tokenVerify, isAdmin} = require("../middlewares/userValidation");
const controller = require("../controllers/controller.post");
const route = Router();

route.post("/create", tokenVerify, isUser, controller.createPost);

route.get("/posts", tokenVerify, controller.allPosts);

route.get("/post",tokenVerify, isUser, controller.userPost);

route.patch("/update/", tokenVerify, isUser, controller.updatePost);

route.patch("/delete", tokenVerify, controller.deletePost);

route.get("/pending", tokenVerify, isAdmin, controller.getPending);

route.post("/pending", tokenVerify, isAdmin, controller.updateStatus);

route.get("/delete", tokenVerify, isAdmin, controller.getDeletedPost);


module.exports = route;