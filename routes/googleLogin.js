const express = require('express');
const router = express.Router();
const passport = require('passport');

const mySql = require('mysql');
// MySQl config 
const sqlConf = require('../config/db')
const conn = mySql.createConnection(sqlConf);

const authController = require('../controller/finalAuth')

router.get('/googlelogin', passport.authenticate('google', { scope: ['profile'] }))

// Google Auth
router.get('/gAuth', passport.authenticate('google', {
    successRedirect: '/submitGoogleUserData',
    failureRedirect: '/login'
}))

router.get('/submitGoogleUserData', authController.gAuth);

module.exports = router;