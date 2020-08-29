const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller 
const authController = require('../controller/finalAuth')
// Login to github page
router.get('/gitLogin', passport.authenticate('github'));
// Processing 
router.get('/auth', passport.authenticate('github',{
    successRedirect: '/submitUserData',
    failureRedirect: '/login'
}));
// If all things is true! (success redirect)
router.get('/submitUserData', authController.gitAuth);


module.exports = router;