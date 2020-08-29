const dbModel = require('../model/dbModel')
const getInUserAccount = (req, res, next) => {
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
}
module.exports = {getInUserAccount}