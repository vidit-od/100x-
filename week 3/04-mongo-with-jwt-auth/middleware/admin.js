let jwt = require('jsonwebtoken');
let JWT_SECRET = require('../jwttoken.js');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    let token = req.headers.authorization
    token = token.split(' ')[1]
    console.log(token)

    try{
        jwt.verify(token,JWT_SECRET);
        next();
    }
    catch{
        res.json({
            msg: 'Invalid jwt token'
        })
    }
}

module.exports = adminMiddleware;