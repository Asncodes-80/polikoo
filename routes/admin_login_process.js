const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const bcrypt = require('bcrypt');

// Create connection to db MySQL
const conn = mySql.createConnection({
    host:'158.58.187.220',
    user:'TarjomanUser',
    password:'Mez76%f1',
    database:'tarjomandb'
});

// Processing login username password
router.post('/', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(username !== "" && password !== ""){
        const cmd = `select * from adminaccounts where username like "%${username}%"`;
        conn.query(cmd, (err, results)=>{
            // error parser 
            if(err){
                res.redirect('/adminlogin?msg=dbFailure');
                console.log('database error to auth');
            }
            // results to get password 
            if(results != ""){
                const resultPreparing = results[0];
                bcrypt.compare(password, resultPreparing.password, (error, match)=>{
                    if(!match){
                        res.redirect(`/adminlogin?msg=dbFailure`);
                        console.log('failed')
                    }else{
                        res.cookie("adminId", username);
                        res.cookie("password", resultPreparing.password);
                        res.redirect(`/admin/${username}`);
                    }
                });
            }else{
                res.redirect(`/adminlogin?msg=dbFailure`);
            }
        });
    }else
        res.redirect(`/adminlogin?msg=failure`);
});



module.exports = router;