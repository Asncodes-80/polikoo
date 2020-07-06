const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const bcrypt = require('bcrypt');
// Create connection to db MySQL
const conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'polikoo' //accounts table
}); 

// Processing login username password
router.post('/', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(username !== "" && password !== ""){
        const cmd = `select * from accounts where username like "%${username}%"`;
        conn.query(cmd, (err, results)=>{
            // error parser 
            if(err){
                res.redirect('/login?msg=dbFailure');
                console.log('database error to auth');
            }
            // results to get password 
            if(results != ""){
                const resultPreparing = results[0];
                bcrypt.compare(password, resultPreparing.password, (error, match)=>{
                    if(!match){
                        res.redirect(`login?msg=dbFailure`);
                        console.log('failed')
                    }else{
                        res.cookie("username", username);
                        res.cookie("password", resultPreparing.password);
                        // res.redirect(`/account/${username}`);
                        console.log(match)
                        res.redirect('userAccountPreparing');
                    }
                });
            }else{
                res.redirect(`login?msg=failure`);
            }
        });
    }else
        res.redirect(`login?msg=failure`);
});



module.exports = router;