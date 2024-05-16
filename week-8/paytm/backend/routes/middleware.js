const express= require('express');
const jwt = require('jsonwebtoken');

function middleware(req,res,next){
    const token = req.headers.token.split(' ')[1];
    try{
        const userid = jwt.verify(token,process.env.JwtSecret);
        req.userid = userid;
        next();
    }
    catch{
        res.status(411).json({msg: "invalid token"})
    }
}


module.exports = {
    middleware,
}