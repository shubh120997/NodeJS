const express = require("express");
const postController = require("../controllers/controller.post");
const router = express.Router();

router.get("/posts", postController.all);

router.get("/posts/post/:id", postController.individual);

router.post("/posts/addpost/:id", postController.add);

router.patch("/posts/editpost/:id/:post_id", postController.edit);

router.delete("/posts/deletepost/:id/:post_id", postController.delete);

module.exports = router;