const express = require('express')
const router = express.Router();

router.post('/', (req, res, next)=>{
    res.clearCookie('username');
    res.clearCookie('password');
    res.redirect('/');
});

module.exports = router;