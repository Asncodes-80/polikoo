const express = require('express');
const router = express.Router();
const mySql = require('mysql');
// Config file 
const confDb = require('../config/db');
const conn = mySql.createConnection(confDb);

router.post('/', (req, res, next)=>{
    const fullName = req.body.fullName;
    const username = req.body.username;
    const ntCode = req.body.ntCode;
    const ipAddress = req.body.ipaddress;

    // Statement if user is exists!
    if(fullName !="" && username !="" && ntCode !="" && ipAddress !=""){

        const cmd = `select * from accounts where username like "%${username}%"` 

        conn.query(cmd, (err, results)=>{
            if(err) res.send(err);
            // if he's exists:
            if(results !=""){
                if(results[0].naturalcode == ntCode){
                    // Saving user in cookie to get yaro to data base fetching
                    res.cookie("username", username);
                    // Loading Time 2sec...
                    res.redirect('/userAccountPreparing');  
                }else{
                    res.redirect('/login?msg=ntFailed')
                }
            }else{
                 // JS object           
                const data = {
                    fullname: fullName,
                    username: username,
                    password: '',
                    naturalcode: ntCode,
                    ipaddress: ipAddress
                };
                const cmd = 'INSERT INTO accounts SET ?';
                conn.query(cmd, data, (err, outing)=>{
                    if(err){
                        res.send(err);
                    }
                    if(outing){
                        // Saving user in cookie to get yaro to data base fetching
                        res.cookie("username", username);
                        // Loading Time 2sec...
                        res.redirect('/userAccountPreparing');
                    }
                })
            }
        });

    }else{
        res.redirect('/login?msg=failure');
    }
});

module.exports = router;