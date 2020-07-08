const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const publicIp = require('public-ip');
const bcrypt = require('bcrypt');


// Create connection to db MySQL
const conn = mySql.createConnection({
    host:'158.58.187.220',
    user:'TarjomanUser',
    password:'Mez76%f1',
    database:'tarjomandb'
});

//register_process
router.post('/', (req, res, next)=>{
    const saltRounds = 10;
    (async () => {
        const fullname = req.body.fullname;
        const username = req.body.username;
        const password = req.body.password;
        const ntCode = req.body.ntCode;
        const ipAddre = await publicIp.v4();
        //hashing passwords
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            bcrypt.hash(password, salt, (err, hash)=>{
                const usrData = {
                    fullname: fullname,
                    username: username,
                    password: hash,
                    naturalcode: ntCode,
                    ipaddress: ipAddre
                };
                
                if(fullname!=="" && username!=="" &&
                password!=="" && ntCode!==""){
                // SQL command
                const cmd = 'insert into accounts set ?';
                conn.query(cmd, usrData, (err, results)=>{
                    if(err) {
                        res.redirect('/signup?msg=dbFailure');
                    }else{
                        res.redirect('login?msg=success');
                    }
                });
            }else{
                res.redirect('/signup?msg=failure');
            }
            
            });
        });
    })();
});


module.exports = router;