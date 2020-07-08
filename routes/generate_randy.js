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
    let cmd = 'delete from admin';
    conn.query(cmd, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            const randy = Math.floor(Math.random()*71);
            const data = {random: randy};
            let addQuery = 'insert into admin set ?';
            conn.query(addQuery, data, (err, resulting)=>{
                if(err){
                    res.send(`in this time you cann't adding somethings... `);
                }
                if(resulting){
                    res.send(`insert ${randy} successful!`);
                }
            });
        }
    });
    
})

module.exports = router;