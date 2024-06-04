import express from 'express';
import prisma from '../prisma';
import { Hono } from 'hono';

export const userRoute = new Hono();


userRoute.post('/create',async(c)=>{
    try{
        const body:{
            username:string;
            password:string;
            firstname:string;
            lastname:string
        } = await c.req.json();
        console.log(body);
        const response = await prisma.users.create({
            data:{
                username: body.username,
                password: body.password,
                firstname: body.firstname,
                lastname: body.lastname
            }
        })
        return c.json({msg:'New user created', user: response});
    }
    catch(e){
        return c.json({
            msg: 'invalid ',
            error: e
        });
    }
})  

userRoute.get('/get',async(c)=>{
    try{
        const username:string = await c.req.json()
        const response = await prisma.users.findUnique({
            where:{
                username
            }    
        })

        c.json({msg:"success", user:response});
    }
    catch{
        c.json({msg: 'invalid'});
    }
})

userRoute.put('/update',async(c)=>{
    try{
        const body:{
            username:string,
            firstname:string,
            lastname:string,
            password:string
        } = await c.req.json();

        const response = await prisma.users.update({
            where:{
                username:body.username,
            },
            data:{
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password,
            }
        })

        c.json({
            msg: 'updated',
            response,
        })
    }
    catch{
        c.json({msg:'invalid'})
    }
})
