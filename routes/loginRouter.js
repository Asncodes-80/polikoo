const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    switch (req.query.msg) {
        case 'failure':
            res.locals.msg = `<script>alert('لطفا اطلاعات خواسته شده را وارد کنید');</script>`;
            break;
        case 'dbFailure':
            res.locals.msg = `!شما عضو سايت نيستيد`;
            break;
        case 'success':
            res.locals.msg = `شما با موفقیت عضو سایت شده اید `
            break;
        case 'ntFailed':
            res.locals.msg = 'کد ملی وارد شده با کد ملی ثبت شده مغایرت دارد';
            break;
        case 'usrSame':
            res.locals.msg = 'نام کاربری و يا کد ملی دیگری انتخاب کنید!';
            break;
        case 'dberr':
            res.locals.msg = 'مشکلی از سوی دیتابیس';
            break;
        case 'ntErr':
            res.locals.msg = '!کد ملی شما قبلا در سامانه ثبت شده';
            break;
        default:
            res.locals.msg = ``;
    }
    next();
});

// Get login screen 
router.get('/', (req, res, next) => {
    res.render('loginScreen');
})


module.exports = router;