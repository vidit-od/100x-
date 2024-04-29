const AdminUsers = require("../db")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password


    AdminUsers.Admin.findOne({
        username: username,
        password:password
    })
    .then(user=>{
        if(user != null){
            next();
        }
        else{
            res.json({msg : "no such user found"})
        }
    })
}

module.exports = adminMiddleware;