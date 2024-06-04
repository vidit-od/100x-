import express from 'express';
import { PrismaClient } from '@prisma/client';
export const todoRouter = express.Router();


const client = new PrismaClient();
todoRouter.get('/:userid',async(req,res)=>{
    const username = req.params.userid;
    client.$connect();
    const user = await client.users.findUnique({
        where:{
            username: username
        }
    })
    if( user == null) return res.status(400).json({msg: "no such user"})
    const todos = await client.todo.findMany({
        where:{
            user_id : user?.id
        }
    })

    res.status(200).json({
        todos
    })
})


todoRouter.post('/add',async(req,res)=>{
    const { username,title,description } = req.body

    const user = await client.users.findUnique({
        where:{
            username
        }
    })
    if( user == null) return res.status(400).json({msg: 'no such user exist'})
    const response = await client.todo.create({
        data:{
            title,
            description,
            user_id: user?.id
        }
    })

    res.status(200).json({
        msg: 'todo created',
        response
    })
})

todoRouter.put('/completed',async(req,res)=>{
    try{
        const todo_id:number = req.body.todo_id
        const response = await client.todo.update({
            where:{
                id : todo_id
            },
            data:{
                done: true
            }
        })

        res.status(200).json({
            response
        })
    }
    catch{
        res.status(400).json({msg:'invalid'})
    }
})