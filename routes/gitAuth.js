const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('github',{
    successRedirect: '/submitUserData',
    failureRedirect: '/login'
}));

module.exports = router;