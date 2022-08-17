const modelUser = require("../models/model.user");

exports.all = (req, res) => {
    modelUser.selectAll( (err, data) => {
        if(err) console.log(err);
        else res.json(data);
    });
}

exports.individual = (req, res) => {
    const id = req.params.id;
    modelUser.individual(id, (err, data) => {
        if(err) console.log(err);
        else res.send(data);
    });
}

exports.add = (req, res) => {
    console.log(req.body);
    modelUser.add(req.body, (err, data) => {
        if(!err) res.redirect("/users");
        else res.json(err);
    });
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const input = req.body;
    
    modelUser.edit(input, id, (err, data) => {
        if(err) res.json(err);
        else res.json(data);
    })
}

exports.delete = (req, res) => {
    modelUser.delete(req.params.id, (err, data) => {
        if(err) console.log(err);
        else res.json(data);
    });
}