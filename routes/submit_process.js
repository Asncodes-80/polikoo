const express = require('express');
const router = express.Router();
const mySql = require('mysql');

// Create connection to db MySQL
const conn = mySql.createConnection({
    host:'158.58.187.220',
    user:'TarjomanUser',
    password:'Mez76%f1',
    database:'tarjomandb'
});

router.post('/', (req, res, next)=>{
    const username = req.cookies.username;
    const usrData = {username: username};
    const cmd = 'insert into winner set ?';
    conn.query(cmd, usrData, (err, results)=>{
        if(err){
            console.log(err);
        }
        if(results){
            res.redirect('/?msg=success')
        }
    })
})


module.exports = router;