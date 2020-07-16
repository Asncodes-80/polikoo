const express = require('express');
const router = express.Router();
const mySql = require('mysql');
// Config file 
const confDb = require('../config/db');
const conn = mySql.createConnection(confDb);

router.post('/', (req, res, next) => {
    // User data:
    const u_id = req.body.uId;
    const fullName = req.body.fullName;
    const username = req.body.username;
    const ntCode = req.body.ntCode;
    const ipAddress = req.body.ipaddress;

    // Statement if user is exists!
    if (fullName != "" && username != "" && ntCode != "" && ipAddress != "") {

        const cmd = `select * from accounts where u_id like "%${u_id}%"`

        conn.query(cmd, (err, results) => {
            if (err) res.redirect('/login?msg=dberr');
            // if he's exists:
            if (results != "") {
                // Saving user in cookie to get yaro to data base fetching
                res.cookie("u_id", u_id);
                // Loading Time 2sec...
                res.redirect('/userAccountPreparing');
            } else {
                const cmdCheckNtCode = `select * from accounts where naturalcode like "%${ntCode}%"`;
                conn.query(cmdCheckNtCode, (err, enCore) => {
                    if (err) res.seal('Error in net');

                    if (enCore != "") res.redirect('/login?msg=ntErr');
                    else {
                        // JS object
                        const data = {
                            u_id: u_id,
                            fullname: fullName,
                            username: username,
                            password: '',
                            naturalcode: ntCode,
                            ipaddress: ipAddress
                        };
                        const cmd = 'INSERT INTO accounts SET ?';
                        conn.query(cmd, data, (err, outing) => {
                            if (err) {
                                res.redirect('/login?msg=usrSame');
                            }
                            if (outing) {
                                // Saving user in cookie to get yaro to data base fetching
                                res.cookie("u_id", u_id);
                                // Loading Time 2sec...
                                res.redirect('/userAccountPreparing');
                            }
                        })
                    }
                });
            }
        })
    } else res.redirect('/login?msg=failure');
});

module.exports = router;