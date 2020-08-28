const express = require('express');
const router = express.Router();
const passport = require('passport');
// Connected to main db:
const mySql = require('mysql');
// MySQl config 
const sqlConf = require('../config/db')
const conn = mySql.createConnection(sqlConf);
// Login to github page
router.get('/gitLogin', passport.authenticate('github'));
// Processing 
router.get('/auth', passport.authenticate('github',{
    successRedirect: '/submitUserData',
    failureRedirect: '/login'
}));
// If all things is true! (success redirect)
router.get('/submitUserData', (req, res, next) => {
    const u_id = req.user.id;
    const fullName = req.user.displayName;
    const username = req.user.username;
    const avatar = req.user.photos[0].value;
    // Validation into db:
    const checkIn = `select * from accounts where u_id like "%${u_id}%"`;

    conn.query(checkIn, (err, results) => {

        if (err) res.send('Database error!');// DB Error!

        if (results != "") { // If user exist now!
            res.cookie("u_id", u_id);
            res.redirect("/userAccountPreparing");
        } else { // If you're new to Polikoo
            res.render('submitLogin', {
                u_id: u_id,
                fullName: fullName,
                username: username,
                avatar: avatar
            });
        }
    });
});


module.exports = router;