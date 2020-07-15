const express = require('express');
const router = express.Router();

// Get loader screen 
router.get('/', (req, res, next)=>{
    const username = req.cookies.username;
    res.render('loader',{username: username});
    // This process joined to other form view to go on account/u_id
    // res.redirect(`/account/${username}`);
})


module.exports = router;