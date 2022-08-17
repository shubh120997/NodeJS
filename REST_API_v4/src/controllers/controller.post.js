const postModel = require("../models/model.post");
const userModel = require("../models/model.user");

exports.createPost = async (req, res) => {
    try{
        const data = await userModel.findByEmail(res.locals.email);
        const user = (data[0])[0];
        await postModel.createPost(req.body, user.id);
        res.send("Post created sucessfully");
    }catch(err){
        res.send(err);
    }
}

exports.allPosts = async (req, res) => {
    try{
        const data = await postModel.approvedPost();
        res.send(data[0]);
    }catch(err){
        res.send(err);
    }
}

exports.getPending = async (req, res) => {
    try{
        const data = await postModel.pendingPost();
        res.send(data[0]);
    }catch(err){
        res.send(err);
    }
}

exports.updateStatus = async (req, res) => {
    try{
        await postModel.updatePostStatus(req.body);
        res.send("Status updated sucessfully");
    }catch(err){
        res.send(err);
    }
}

exports.userPost = async (req, res) => {
    try{
        const data = await userModel.findByEmail(res.locals.email);
        const user = (data[0])[0];
        const result = await postModel.findById(user.user_id);
        res.send({
            message: `Welcome ${user.firstName} ${user.lastName}`,
            posts: result[0]
        })
    }catch(err){
        res.send(err);
    }
}

exports.updatePost = async(req, res) => {
    try{
        await postModel.updatePost(req.body);
        res.send("Post updated sucessfully");
    }catch(err){
        res.send(err);
    }
}

exports.deletePost = async(req, res) => {
    try{
        if(res.locals.type === 'admin'){
            await postModel.deletePost(req.body.id, 'admin');
            res.send("Post deleted sucessfully");
        }
        else{
            const data = await userModel.findByEmail(res.locals.email);
            const user = (data[0])[0];
            await postModel.deletePost(req.body.id, 'user', user.user_id);
            res.send("Post deleted sucessfully");
        }
    }catch(err){
        res.send(err);
    }
}

exports.getDeletedPost = async(req,res) => {
    try{
        const data = await postModel.allDeleted();
        res.send(data[0]);
    }catch(err){
        res.send(err);
    }
}