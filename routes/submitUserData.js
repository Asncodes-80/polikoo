const express = require('express');
const router = express.Router();

const mySql = require('mysql');
// MySQl config 
const sqlConf = require('../config/db')
const conn = mySql.createConnection(sqlConf);

router.get('/', (req, res, next)=>{
    const fullName = req.user.displayName;
    const username = req.user.username;
    const avatar = req.user.photos[0].value;
    
    const checkIn = `select * from accounts where username like "%${username}%"`;
    conn.query(checkIn, (err, results)=>{

        if(err) res.send('Database error!');

        if(results != ""){ // If user exist now!
            res.cookie("username", username);
            res.redirect("/userAccountPreparing");
        }else{ // If you're new to Polikoo
            res.render('submitLogin',{
                fullName: fullName,
                username: username,
                avatar: avatar
            }); 
        }
    });
});

module.exports = router;