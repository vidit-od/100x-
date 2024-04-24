// same objective as todo 
// extra part : use a file to store the data 
// i.e a file system to save data 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { title } = require('process');

app.use(bodyParser.json())

app.listen(3000)

app.get('/todos/:id?',(req,res) =>{
    const id = req.params.id
    fs.readFile('./todos.json','utf-8',(err,data)=>{
        // if file does not exist , create a new empty file 
        if(err != null){
            const emptyJsonFile = [];
            const stringJson = JSON.stringify(emptyJsonFile);
            fs.writeFile('./todos.json',stringJson,'utf-8',(err,data)=>{
                if(err != null) res.status(404).send(`Some error processing your request`)
                else res.status(200).send('The list is empty right now ')  
            })
        }
        // if it exists read and respond it as a list of Json objects 
        else{
            let Todo = data
            Todo = JSON.parse(Todo);
            if(id){

                const index = Todo.findIndex(t => parseInt(t.id) === parseInt(req.params.id));
                if(index == -1){
                    return res.status(404).send(`No Todo with id ${id} exists`)
                }
                else{
                    return res.status(200).send(Todo[index]);
                }
            }
            else{
                res.status(200).send(Todo);
            }
            
        }
    });
})

app.post('/todos',(req,res)=>{
    fs.readFile('./todos.json','utf-8',(err,data)=>{
        const new_title = req.body.title
        const new_desc = req.body.description 
        const new_id = Math.floor(Math.random()* 1000000)

        const new_todo = {
            id : new_id,
            title:new_title,
            description:new_desc
            
        }
        let Todo = data
        Todo = JSON.parse(Todo);
        Todo.push(new_todo);
        Todo = JSON.stringify(Todo);
        fs.writeFile("./todos.json",Todo,"utf-8",(err,data)=>{
            if(err != null){
                res.status(404).send("Error opening your todo list")
            }
            else{
                res.status(201).send(Todo);
            }
        })
    })
})

app.put('/todos/:id',(req,res)=>{
    fs.readFile("./todos.json","utf8",(err,data)=>{
        if(err != null){
            res.status(404).send("Error opening your todo list")
        } 
        else{
            let Todo = data
            Todo = JSON.parse(Todo);
            const id = req.params.id;
            let index = Todo.findIndex(t => t.id === parseInt(req.params.id));
            if(index == -1){
                res.status(404).send("The Todo does not exist !! Cannot Update")
            }
            else{
                Todo[index].title = req.body.title
                Todo[index].description = req.body.description
                Todo = JSON.stringify(Todo);
                fs.writeFile('./todos.json',Todo,(err,data)=>{
                    if(err != null){
                        res.status(404).send("Error while updating !!")
                    }
                    else{
                        res.status(200).send(Todo);
                    }
                })
            }
        }
    })
})

app.delete('/todos/:id',(req,res)=>{
    fs.readFile("./todos.json","utf8",(err,data)=>{
        if(err != null){
            res.status(404).send("Error opening your todo list")
        } 
        else{
            let Todo = data
            Todo = JSON.parse(Todo);
            const id = req.params.id;
            let index = Todo.findIndex(t => t.id === parseInt(req.params.id));
            if(index == -1){
                res.status(404).send("The Todo does not exist !! Cannot Update")
            }
            else{
                Todo.splice(index,1);
                Todo = JSON.stringify(Todo);
                fs.writeFile('./todos.json',Todo,(err,data)=>{
                    if(err != null){
                        res.status(404).send("Error while deleting !!")
                    }
                    else{
                        res.status(200).send(Todo);
                    }
                })
            }
        }
    })
})
