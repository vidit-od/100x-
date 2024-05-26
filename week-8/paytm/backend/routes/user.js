const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
module.exports =router;

const {User, Bank} = require('../db');
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

    // assign a random balance to the newly created user 
    const RandomBalance = Math.floor(Math.random()* 10000);
    const newBank = await Bank.create({
        userID: newUser._id,
        balance: RandomBalance
    })

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

// verification
router.get('/',middleware, async(req,res)=>{
    const user = await User.findOne({username: req.userid})
    res.status(200).json({status:true , user:user});
})
// use filter to get particular user 
router.get('/bulk',async(req,res)=>{

    // key value pairs in url are called query , only value is called params 
    const filter = req.query.filter;

    // using regex to create filter logic
    const filterUsers = await User.find({
        $or : [{
            firstname: { $regex : filter}
        },{
            lastname: { $regex : filter}
        }
        ]
    })

    res.status(200).json({users : filterUsers});
})