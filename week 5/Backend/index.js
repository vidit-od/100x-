const express = require('express');
const app = express();
const {Todo, User} = require("./db");
const {CreateTodo,UpdateTodo,UserSchema} = require('./zodschema.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
let jwt_secret = require('./jwtsecret.js').jwt_secret;

// for body parsing in header
app.use(express.json());
app.use(cors());

app.listen(3000);


app.post('/signup',async(req,res)=>{
    const username = req.headers.username
    const password = req.headers.password
    // input validation
    const ZodCheck = UserSchema.safeParse({
        Username: username,
        Password: password,
    })
    if(!ZodCheck.success){
        return res.status(404).json({msg: 'Invalid Username or Password'})
    }

    // check if this username already exists in the db
    const response = await User.findOne({Username : username})
    if(response == null){
        const CreateUser = await User.create({
            Username: username,
            Password: password
        })

        return res.status(200).json(CreateUser);
    }
    res.status(411).json({msg: 'Username is preoccupied'})
})
app.post('/signin',async(req,res)=>{
    const username = req.headers.username;
    const password = req.headers.password;

    const ZodCheck = UserSchema.safeParse({
        Username: username,
        Password: password,
    })
    if(!ZodCheck.success){
        return res.status(404).json('invalid username or password');
    }
    const FindUser = await User.findOne({Username: username});
    if(FindUser){
        const token = jwt.sign({
            Username: username,
            Password: password
        },jwt_secret);
        return res.status(200).json(token);
    }
    res.status(404).json({msg : 'could no sigin'})

})
app.post('/verification', (req,res)=>{
    const token = req.headers.token;
    try{
        jwt.verify(token,jwt_secret);
        return res.status(200).json({msg: "verified"});
    }
    catch{  
        return res.status(404).json({msg: 'not verified'});
    }
})
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
app.put('/todos',async(req,res)=>{
    const todoId = req.headers.id;
    const InputVerification = UpdateTodo.safeParse(todoId);
    if(!InputVerification){
        return res.status(411).json({msg: 'invalid id'});
    }

    const message = await Todo.updateOne({_id : todoId}, {Completed:true});
    res.json({msg : message})
})