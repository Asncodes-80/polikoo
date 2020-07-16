const express = require('express');
const router = express.Router();

const mySql = require('mysql');
// MySQl config 
const sqlConf = require('../config/db')
const conn = mySql.createConnection(sqlConf);

router.get('/', (req, res, next) => {
    const u_id = req.user.id;
    const fullName = req.user.displayName;
    const username = req.user.username;
    const avatar = req.user.photos[0].value;

    const checkIn = `select * from accounts where u_id like "%${u_id}%"`;
    conn.query(checkIn, (err, results)=>{

        if(err) res.send('Database error!');

        if(results != ""){ // If user exist now!
            res.cookie("u_id", u_id);
            res.redirect("/userAccountPreparing");
        }else{ // If you're new to Polikoo
            res.render('submitLogin',{
                u_id: u_id,
                fullName: fullName,
                username: username,
                avatar: avatar
            });
        }
    });

    // const fullName = req.user.displayName;
    // const username = define with user
    // const avatar= req.user.picture[0].value
    // console.log(req.user);

});

module.exports = router;