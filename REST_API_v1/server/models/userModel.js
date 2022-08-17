const dbconn = require('../../config/db.config');

exports.findAllUser = (row) => {
    dbconn.query("Select * from employees", (err, rows) => {
        if(err){
            row(null, err);
        }
        else{
            row(null, rows);
        }
        console.log("The data from the table \n", rows);
    });
};

exports.findUser = (search, row) => {
    console.log(search);
    dbconn.query("Select * from employees where id = ? or first_name = ?", [search, search], (err, rows) => {
        if(err) row(null, err);
        else row(null, rows);
    })
}

exports.delete = (search, result) => {
    dbconn.query("Delete from employees WHERE id = ?", search, (err) => {
        if(err) result(null, err);
        else result(null, "Data is deleted sucessfully");
    })
}

exports.create = (input, result) => {
    const {first_name, last_name, email, phone, salary} = input;

    dbconn.query("Insert into employees set first_name = ?, last_name = ?, email = ?, phone = ?, salary = ?",
    [first_name, last_name, email, phone, salary], (err) => {
        if(!err) result(null, "Data successfully inserted.");
        else result(err, null);
    });
}