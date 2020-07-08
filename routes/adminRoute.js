const express = require('express');
const router = express.Router();
// Get admin 
router.get('/', (req, res, next)=>{
    res.render('admin');
})

module.exports = router;
