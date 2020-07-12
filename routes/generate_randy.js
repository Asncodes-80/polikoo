const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const dbConfig = require('../config/db');

// Create connection to db MySQL
const conn = mySql.createConnection(dbConfig);

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