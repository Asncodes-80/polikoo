const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');

// Get Home Page
router.get('/', (req, res, next)=>{
    res.render('index');
});


module.exports = router;