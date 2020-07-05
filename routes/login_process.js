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

router.post('/', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            console.log(username, hash);
            const cmd = `select * from accounts where username like "%${username}%" and password like "%${hash}%"`;
            conn.query(cmd, (err, results)=>{
            if(err){
                return res.redirect('/login');
            }else{
                res.cookie("username", username);
                res.cookie("password", hash);
                console.log(results);
                res.redirect(`/account/${username}`);
            }
        })
        })
    })
    // if(username !== "" && password !== ""){
    //     const cmd = `select * from accounts where username like "%${username}%" and password like "%${password}%"`;
    //     conn.query(cmd, (err, results)=>{
    //         if(err){
    //             return res.redirect('/login');
    //         }else{
    //             res.cookie("username", username);
    //             res.cookie("password", password);
    //             console.log(results);
    //             res.redirect(`/account/${username}`);
    //         }
    //     })
    // }else{
    //     res.redirect(`login?msg=failure`);
    // }
});



module.exports = router;