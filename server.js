const createError = require('http-errors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// Github strategy 
const GitHubStrategy = require('passport-github').Strategy;
// Github Config
const gitConf = require('./config/gitConf');
// Google strategy 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Google config
const googleConf = require('./config/googleConfig');

const mySql = require('mysql');
// Creating connection with mysql soft db.
const config = require('./config/db')
// Create connection to db MySQL 
const conn = mySql.createConnection(config);
// Check out connection is true or false
conn.connect((err) => {
    if (err) return console.log('Connection failed');
    return console.log('Connected');
})

app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname + '/public/css')));
app.use('/assets/img', express.static(path.join(__dirname + '/public/assets/img')))
app.use('/assets/font', express.static(path.join(__dirname + '/public/assets/font')))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// This section must be first!
app.use(session({
    secret: 'I love Express!',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
// Setting passport with Github strategy
passport.use(new GitHubStrategy(gitConf,
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));
// Setting passport with Google strategy
passport.use(new GoogleStrategy(googleConf,
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }
));
// SerializeUser
passport.serializeUser((user, cb) => {
    cb(null, user)
});
// DeserializeUser
passport.deserializeUser((user, cb) => {
    cb(null, user)
});
// The Router
// const adminRoute = require('./routes/adminRoute');
const adminLogin = require('./routes/adminLogin');
const admin_login_process = require('./routes/admin_login_process');
const generate_randy = require('./routes/generate_randy');
const index = require('./routes/indexRouter');
const login = require('./routes/loginRouter');
// ===================GitHub Auth sys========================
const gitLogin = require('./routes/gitLogin');
const gitAuth = require('./routes/gitAuth');
const submitUserData = require('./routes/submitUserData');
const submit_login_process = require('./routes/submit_login_process');
// ==================Google Auth sys=========================
const googleLogin = require('./routes/googleLogin');
const googleAuth = require('./routes/googleAuth');
const submitGoogleUserData = require('./routes/submitGoogleUserData')
// ==================Polikoo Auth sys=========================
const signup = require('./routes/signupRouter');
const register_process = require('./routes/register_process');
const login_process = require('./routes/login_process');
const loaderScreen = require('./routes/loaderRoute');
const submit_process = require('./routes/submit_process');
const logout = require('./routes/logout');

// app.use('/admin9903', adminRoute);
app.use('/adminlogin', adminLogin);
app.use('/admin_login_process', admin_login_process);
app.use('/admin/generate_randy', generate_randy);
app.use('/', index);
app.use('/login', login);
// ================GitHub Authenticate Page=====================
app.use('/gitLogin', gitLogin);
app.use('/auth', gitAuth);
app.use('/submitUserData', submitUserData);
app.use('/submit_login_process', submit_login_process);
//================Google Authenticate Page=====================
app.use('/googlelogin', googleLogin);
app.use('/gAuth', googleAuth);
app.use('/submitGoogleUserData', submitGoogleUserData);
// ==================Polikoo Auth=========================
app.use('/signup', signup);
app.use('/register_process', register_process);
app.use('/login_process', login_process);
// =====================================================
app.use('/userAccountPreparing', loaderScreen);
app.use('/submit_process', submit_process);
app.use('/logout', logout);


// Create middleware for NotFound page 404
app.use((req, res, next)=>{
    if(!req.user)
        return res.render('404')
        // return next(createError(404, res.render('test')));
    next();
})

// Create a middleware to get admin random number
app.use((req, res, next) => {
    let cmd = 'select * from admin';
    conn.query(cmd, (err, results) => {
        if (err) return res.send(err);
        if (results != "")
            res.locals.adResults = results;
        else
            res.locals.adResults = ``;
    });
    next();
});


app.use((req, res, next) => {
        if (req.query.msg == "charged")
            res.locals.msg = 'حساب شما شارژ شد';
    next();
});

app.get('/account/:userId', (req, res, next) => {
    const userId = req.params.userId;
    try {
        const cmd = `select * from accounts where u_id like "%${userId}%"`;
        conn.query(cmd, (err, results) => {
            if (err) res.redirect('login');
            // To authentication of user if his exists.
            if (results != "") {
                res.render('account', {results: results});
            } else
                res.redirect('/login?msg=dbFailure');
        })
    } catch {
        res.redirect('login');
    }
});


app.get('/admin/:adminId', (req, res, next) => {
    const adminId = req.params.adminId;
    const cookeAdmin = req.cookies.adminId;

    if (adminId === cookeAdmin) {
        const cmd = `select * from winner`;
        conn.query(cmd, (err, results) => {
            if (err) {
                res.redirect('adminlogin?msg=failure');
                console.log(err);
            }
            // To authentication of user if his exists.
            if (results != "") {
                res.render('admin', {results: results});
            } else
                res.redirect('/adminlogin?msg=failure');
        })
    } else {
        res.redirect('adminlogin?msg=dbFailure');
    }
});


app.listen(4000);
console.log('your server port is 4000');
