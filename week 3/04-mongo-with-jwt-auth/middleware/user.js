const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwttoken.js')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    try{
        jwt.verify(token,jwt_secret);
        next();
    }
    catch{
        res.json({
            msg : 'Error authentication'
        })
    }

}

module.exports = userMiddleware;