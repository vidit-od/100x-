const express = require('express');
const app = express();
const {Todo} = require("./db");
const {CreateTodo,UpdateTodo} = require('./zodschema.js');
const cors = require('cors');
// for body parsing in header
app.use(express.json());
app.use(cors());

app.listen(3000);

// logic to get all the todos on my db
app.get('/todos',async(req,res)=>{
    const AllTodo = await Todo.find({});
    res.json(AllTodo)
})
// get a specific todo
app.get('/todo/:id',async(req,res)=>{
    const TodoId = req.params.id
    const ourTodo = await Todo.findOne({
        _id : TodoId
    });
    res.json(ourTodo)
})
// logic to post a todo to our db 
app.post('/todos',async (req,res)=>{
    const TodoTitle = req.body.title;
    const TodoDesc = req.body.description

    const inputVerify = CreateTodo.safeParse(req.body);
    console.log(req.body);
    if(!inputVerify.success){
        return res.status(411).json({msg: 'invalid input'})
    }
    try{
        await Todo.create({
            Title: TodoTitle,
            Description: TodoDesc,
            Completed: false,
        })
        res.json({msg :"your Todo is created"});
    }
    catch{
        res.json({msg :"there was some error"});
    }
})


// logic to update a todo task, given its id 
app.put('/todos/:id',async(req,res)=>{
    const todoId = req.params.id;

    await Todo.updateOne({_id : todoId}, {Completed:true});
    res.json({msg : 'updated'})
})