import express from 'express';
import { indexRouter } from './routes';
import { Hono } from 'hono';

const app = new Hono();
const PORT = 3000;

app.use('*', async(c, next)=>{
    const req = c.req
    if( req.method === 'POST' || req.method === 'PUT' || req.method === "GET"){
        req.parseBody = await req.json();
    }
    await next();
});
app.route('/',indexRouter);

export default app;