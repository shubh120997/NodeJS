/*---------without model---------*/

// const dbconn = require('../../config/db.config');

// exports.viewAllUser = (req, res) => {
//     console.log("Inside viewAllUser");
//     dbconn.query("Select * from employees", (err, rows) => {
//         if(!err){
//             res.send(rows);
//         }
//         else{
//             console.log(err);
//         }
//         console.log("The data from the table \n", rows);
//     });
// }

// exports.viewUser = (req, res) => {
//     let search = req.params.id;
//     dbconn.query("Select * from employees where id = ? or first_name = ?", [search, search], (err, rows) => {        
//         if(!err){
//             res.send(rows);
//         }
//         else{
//             console.log(err);
//         }
//         console.log("The data from the table \n", rows);
//     });
// }

// exports.createUser = (req, res) => {
//     console.log(req);
//     const {first_name, last_name, email, phone, salary} = req.body;

//     dbconn.query("Insert into employees set first_name = ?, last_name = ?, email = ?, phone = ?, salary = ?",
//     [first_name, last_name, email, phone, salary], (err) => {
//         console.log("savfhbhjsbv");
//         if(!err) res.send("Data successfully inserted.")
//         else res.send(err);
//     });
// }

// exports.deleteUser = (req, res) => {
//     // let search = req.params.id;
//     console.log(req.params);
//     dbconn.query("Delete from employees WHERE id = ?", [req.params.id], (err) => {
//         if(err) console.log(err);
//         else res.send("Data is deleted sucessfully");
//     })
// }


/*---------with model---------*/

const dbconn = require('../../config/db.config');
const models = require('../models/userModel');
exports.viewAllUser = (req, res) => {
    models.findAllUser( (err, rows) => {
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
        // console.log("The data from the table \n", rows);
    });
};

exports.viewUser = (req, res) => {
    let search = req.params.id;
    models.findUser( search, (err, rows) => {
        if(!err) res.json(rows);
        else console.log(err);
    });
};

exports.deleteUser = (req, res) => {
    models.delete( req.params.id, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
}

exports.createUser = (req, res) => {
    models.create(req.body, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
}
