const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
module.exports =router;

const {User} = require('../db');
const {UserSchema, SigninSchema, UpdateSchema} = require('../zod');
const {middleware} = require('./middleware');

// create new account logic 
router.post('/signup',async(req,res)=>{

    // input validation using zod
    const {success} = UserSchema.safeParse(req.body);
    if(!success) return res.status(404).json({msg:'Invalid input'})

    // Check if Email already Registered  
    const existingUser = await User.findOne({username: req.body.username});
    if(existingUser) return res.status(404).json({msg: 'Email already registered'});
    
    // all checks passed; genereate user
    const newUser = await User.create({
        username:req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    })

    // create a token for the user for future auth 
    const userid = newUser._id;
    const token = jwt.sign({userid},process.env.JwtSecret);

    // return token and a msg stating "user created"
    res.status(200).json({msg: 'user Created', token: token});
})

// log in logic 
router.post('/signin',async(req,res)=>{
    
    // input validation using zod
    const {success} = SigninSchema.safeParse(req.body);
    if(!success) return res.status(404).json({msg: "invalid Email/password "})

    // check if user exists 
    const user = await User.findOne({username:req.body.username, password:req.body.password});
    if(!user) return res.status(404).json({msg:  "invalid Email/password "})
    
    // all checks passed , return the token for future auth 
    const token = jwt.sign(user.username,process.env.JwtSecret);
    res.status(200).json({msg: 'Successful !!', token : token});
})

// Update user information logic
router.put('/',middleware,async(req,res)=>{

    // input validation using zod
    const {success} = UpdateSchema.safeParse(req.body);
    if(!success) return res.status(404).json({msg: 'Invalid update request'});

    // Update the user's information 
    const user = await User.updateOne({username: req.userid},{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });
    if(!user.acknowledged) return res.status(411).json({msg: 'Error !! could not update '});
    res.status(200).json({msg: 'information updated !!'});
})