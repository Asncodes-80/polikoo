// First Google Auth success and add user to db and GitHub
const dbModel = require('../model/dbModel') 
const gAuth = (req, res, next) => {
    const u_id = req.user.id;
    const fullName = req.user.displayName;
    const username = req.user.username;
    const avatar = req.user.photos[0].value;

    const checkIn = `select * from accounts where u_id like "%${u_id}%"`;
    dbModel.conn.query(checkIn, (err, results)=>{

        if(err) res.send('Database error!');

        if(results != ""){ // If user exist now!
            res.cookie("u_id", u_id);
            res.redirect("/userAccountPreparing");
        }else{ // If you're new to Polikoo
            res.render('submitLogin',{
                u_id: u_id,
                fullName: fullName,
                username: username,
                avatar: avatar
            });
        }
    });
}

const gitAuth =  (req, res, next) => {
    const u_id = req.user.id;
    const fullName = req.user.displayName;
    const username = req.user.username;
    const avatar = req.user.photos[0].value;
    // Validation into db:
    const checkIn = `select * from accounts where u_id like "%${u_id}%"`;

    dbModel.conn.query(checkIn, (err, results) => {

        if (err) res.send('Database error!');// DB Error!

        if (results != "") { // If user exist now!
            res.cookie("u_id", u_id);
            res.redirect("/userAccountPreparing");
        } else { // If you're new to Polikoo
            res.render('submitLogin', {
                u_id: u_id,
                fullName: fullName,
                username: username,
                avatar: avatar
            });
        }
    });
}

module.exports = { 
    gAuth,
    gitAuth
}