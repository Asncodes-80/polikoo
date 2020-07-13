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
    res.render('submitLogin',{
        fullName: fullName,
        username: username,
        avatar: avatar
    });
})

module.exports = router;