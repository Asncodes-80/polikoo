const express = require('express');
const router = express.Router();

// Get loader screen 
router.get('/', (req, res, next)=>{
    const u_id = req.cookies.u_id;
    res.render('loader', { u_id: u_id});
    // This process joined to other form view to go on account/u_id
    // res.redirect(`/account/${username}`);
})


module.exports = router;