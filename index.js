const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mySql = require('mysql');

// Create connection to db MySQL
const conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'polikoo' //accounts table
}); 
// Check out connection is true or false
conn.connect((err)=>{
    if(err) return console.log('Connection failed');
    return console.log('Connected');
})

app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// The Router
const index = require('./routes/indexRouter');
const login = require('./routes/loginRouter');
const signup = require('./routes/signupRouter');
const register_process = require('./routes/register_process');
const login_process = require('./routes/login_process');
const logout = require('./routes/logout');

// Create a middleware to get admin random number
app.use((req, res, next)=>{
    let cmd = 'select * from admin';
    conn.query(cmd, (err, results)=>{
        if(err) return res.send(err);
        if(results != "")
            res.locals.adResults = results;
        else
            res.locals.adResults = ``;
    });
    next();
})

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);
app.use('/register_process', register_process);
app.use('/login_process', login_process);
app.use('/logout', logout);

app.get('/account/:userId', (req, res, next)=>{
    const userId = req.params.userId;
    const username =  req.cookies.username;
    const password = req.cookies.password;
    if(userId === username){
      try{
        const cmd = `select * from accounts where username like "%${username}%" and password like "%${password}%"`;
        conn.query(cmd, (err, results)=>{
            if(err)  res.redirect('login');
            // To authentication of user if his exists.
            if(results != "")            
                res.render('account', {results: results});
            else
                res.redirect('/login?msg=dbFailure');
        })
      }catch{
        res.redirect('login');
      }
        
    }else{
        res.redirect('login');
    }
});

app.listen(4000);
console.log('your server port is 4000');
