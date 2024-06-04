import express from 'express';
import prisma from '../prisma';
import { Hono } from 'hono';
export const todoRouter = new Hono();


todoRouter.get('/:userid',async(c)=>{
    const username = c.req.param('userid');
    const user = await prisma.users.findUnique({
        where:{
            username: username
        }
    })
    if( user == null) return c.json({msg: "no such user"})
    const todos = await prisma.todo.findMany({
        where:{
            user_id : user?.id
        }
    })

    c.json({
        todos
    })
})


todoRouter.post('/add',async(c)=>{
    const body:{
        username:string,
        title:string,
        description:string 
    } = await c.req.json()


    c.json(body)
    const user = await prisma.users.findUnique({
        where:{
            username: body.username
        }
    })
    if( user == null) return c.json({msg: 'no such user exist'})
    const response = await prisma.todo.create({
        data:{
            title: body.title,
            description: body.description,
            user_id: user?.id
        }
    })

    c.json({
        msg: 'todo created',
        response
    })
})

todoRouter.put('/completed',async(c)=>{
    try{
        const todo_id:number = await c.req.json()
        const response = await prisma.todo.update({
            where:{
                id : todo_id
            },
            data:{
                done: true
            }
        })

        c.json({
            response
        })
    }
    catch{
        c.json({msg:'invalid'})
    }
})