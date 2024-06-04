import express from 'express';
import { PrismaClient } from '@prisma/client';
import z from 'zod';

export const userRoute = express.Router();
const client = new PrismaClient();


userRoute.post('/create',async(req,res)=>{
    client.$connect();
    console.log(req.body);
    try{
        const {username,password,firstname,lastname} = req.body;
        const response = await client.users.create({
            data:{
                username,
                password,
                firstname,
                lastname
            }
        })
        res.status(200).json({msg:'New user created', user: response})
    }
    catch{
        res.status(400).json({msg: 'invalid '})
    }
    client.$disconnect();
})  

userRoute.get('/get',async(req,res)=>{
    try{
        const { username } = req.body
        client.$connect();
        const response = await client.users.findUnique({
            where:{
                username
            }    
        })

        res.status(200).json({msg:"success", user:response});
    }
    catch{
        res.status(400).json({msg: 'invalid'});
    }
})

userRoute.put('/update',async(req,res)=>{
    try{
        const {username,firstname, lastname, password} = req.body;
        client.$connect();

        const response = await client.users.update({
            where:{
                username:username,
            },
            data:{
                firstname,
                lastname,
                password,
            }
        })

        res.status(200).json({
            msg: 'updated',
            response,
        })
    }
    catch{
        res.status(400).json({msg:'invalid'})
    }
})
