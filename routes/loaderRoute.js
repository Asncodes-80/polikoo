const express = require('express');
const router = express.Router();

// Get loader screen 
router.get('/', (req, res, next)=>{
    const username = req.cookies.username;
    res.render('loader',{username: username});
    // res.redirect(`/account/${username}`);
})


module.exports = router;