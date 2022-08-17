const modelPost = require("../models/model.post");

exports.all = (req, res) => {
    modelPost.all( (err, data) => {
        if(err) res.json(err);
        res.json(data);
    });
}

exports.individual = (req, res) => {
    const id = req.params.id;
    modelPost.individual(id, (err, data) => {
        if(err) res.json(err);
        res.json(data);
    });
}

exports.add = (req, res) => {
    modelPost.add(req.params.id, req.body, (err, data) => {
        if(err) console.log(err);
        else res.json(data);
    });
}

exports.edit = (req, res) => {
    const user_id = req.params.id;
    const post_id = req.params.post_id;
    const input = req.body;
    modelPost.edit(user_id, post_id, input, (err, data) => {
        if(err) res.json(err);
        res.json(data);
    });
}

exports.delete = (req, res) => {
    const user_id = req.params.id;
    const post_id = req.params.post_id;
    modelPost.delete(user_id, post_id, (err, data) => {
        if(err) res.json(err);
        res.json(data);
    });
}
