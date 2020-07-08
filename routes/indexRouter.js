const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');

// router.use((req, res, next)=>{
//     const clientIp = requestIp.getClientIp(req);
//     console.log(clientIp);
//     next();
// })

// Get Home Page
router.get('/', (req, res, next)=>{
    console.log(req. connection. remoteAddress)
    res.render('index');
});


module.exports = router;