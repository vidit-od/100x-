const express = require('express');
const router = express.Router();

const {middleware} = require('./middleware');
const {User,Bank} = require('../db');

const mongoose = require('mongoose');
// to fetch user's balance 
router.get('/balance',middleware,async(req,res)=>{

    // we get user's email from middleware 
    const userid = req.userid;
    // user email to get the user._id
    const user = await User.findOne({username:userid});
    // use user._id to get the bank info 
    const bankinfo = await Bank.findOne({userID:user._id});

    res.status(200).json({balance: bankinfo.balance , userinfo: user});
})  

router.post('/transfer',middleware,async(req,res)=>{
    // start session for transaction concurrency 
    const transferSession = await mongoose.startSession();
    transferSession.startTransaction();

    const {amount , to} = req.body;

    // get user._id for both to and from 
    const fromUserId = await User.findOne({username:req.userid}).session(transferSession);
    const toUserId = await User.findOne({username:to}).session(transferSession);

    // check if given "to" exists 
    if(!toUserId){
        await transferSession.abortTransaction();
        return res.status(400).json({
            msg: 'Invalid account'
        })
    }
    if(amount == 0){
        return res.status(400).json({
            msg:'Amount cannot be 0'
        })
    }
    // get bank info for to and from 
    const fromBank = await Bank.findOne({userID: fromUserId._id}).session(transferSession);
    const toBank = await Bank.findOne({userID: toUserId._id}).session(transferSession);

    // check if sender has enough money
    if(fromBank.balance < amount){
        await transferSession.abortTransaction();
        return res.status(400).json({
            msg : 'Insufficient balance '
        })
    }

    // all checks passed, perform transactions 
    await Bank.updateOne({_id:fromBank._id}, {$inc : {balance : -amount}}).session(transferSession);
    await Bank.updateOne({_id:toBank._id}, {$inc : {balance: amount}}).session(transferSession);

    transferSession.commitTransaction();
    res.status(200).json({
        msg: 'transfer done'
    })

})
module.exports = router;