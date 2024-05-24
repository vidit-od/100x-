import express, { response } from "express";
import { signup ,signin,update } from '../zod';
import { Statuscode } from "../statuscodes";
import { User , Navbar} from '../db';
import * as jwt from 'jsonwebtoken';
import {middleware} from './middleware';
const SignupRouter = express.Router();

// create a new user
SignupRouter.post('/signup',async(req,res)=>{
    const { success } = signup.safeParse(req.body);

    // zod check
    if(!success) return res.status(400).json({msg: Statuscode.code400});

    // if email is already occupied
    try{
    const response = await User.find({username : req.body.username})
    if(response.length > 0) return res.status(403).json({msg: Statuscode.code403});

    // all checks passed create user
    const msg = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    })
    const nav = await Navbar.create({
        UserID: msg._id,
        Home:0,
        Notification:0,
        Connections:0,
        Messages:0,
    })
    res.status(200).json({msg: Statuscode.code200, newUser: msg.username});
    }
    catch{
        res.status(500).json({msg: Statuscode.code500});
    }
})

// signin users
SignupRouter.post('/signin',async(req,res)=>{
    const {success} = signin.safeParse(req.body);
    if(!success) return res.status(400).json({msg:Statuscode.code200});

    const user = await User.findOne({username:req.body.username, password: req.body.password});
    if(!user) return res.status(403).json({msg:Statuscode.code403});
    
    const token = jwt.sign(req.body.username ,process.env.JwtSecret); 
    res.status(200).json({msg:Statuscode.code200, token: token});
})

// update user info
SignupRouter.put('/update', middleware, async(req,res)=>{
    const { success } = update.safeParse(req.body);

    if(!success) return res.status(400).json({msg:Statuscode.code400});
    
    const response = await User.updateOne({username: req.userid}, {
        firstname: req.body.username,
        lastname: req.body.lastname,
        password: req.body.password
    })

    res.status(200).json({msg:Statuscode.code200});
})

export default SignupRouter;