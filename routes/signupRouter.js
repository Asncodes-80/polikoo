const express = require('express');
const router = express.Router();
router.use((req, res, next)=>{
    switch(req.query.msg){
        case 'failure': res.locals.msg = `<script>alert('لطفا اطلاعات خواسته شده را وارد کنید');</script>`;
        break;
        case 'dbFailure': res.locals.msg = `مشکلی از سوی دیتابیس در هنگام وارد کردن اطلاعات شما بوجود آمده!\nلطفا مجددا امتحان کنید`;
        break;
        case 'lengthStricts': res.locals.msg = '!رمز شما باید حداقل 8 کلمه داشته باشد'
            break;
        default:
            res.locals.msg = ``;
    }
    next();
})

// Get login screen 

router.get('/', (req, res, next)=>{
    res.render('signup');
})


module.exports = router;