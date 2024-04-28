// zod is a library usefull for input validation
// for now we are using mongodb, it is a no sql database 
// i.e it has no schema, we can add anything to it , which is not ideal
// structuring the database is important 

// thus we use zod, it helps us created constrains and schemas that can create a structure to our mongodb 

// _________________________________________________________________________________________________
// without Zod , we need to use multiple if else statements 
// _________________________________________________________________________________________________

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.listen(3000);

// this functions becomes very complex in real applicaiton 
// check email, check password strength with caps,small,special ,, etc ..... thus we use zod library 
function inputverify (req,res,next ){
    const username  = req.body.Username
    const password = req.body.Password
    if( username.length <= 6){
        res.status(411).send('Username is short');
    }
    if ( password.length <= 6){
        res.status(411).send('weak passeord');
    }
    next();
}

// check if the user exists in db 
function existcheck(req,res,next){
    fs.readFile('./login_info.json',(err,data)=>{
        let db = JSON.parse(data);
        db.forEach(element => {
           if(element.username == req.body.Username){
                res.status(411).send('Username already exists');
           } 
        });
        db.push({
            "username": req.body.Username,
            "password": req.body.Password})
        db = JSON.stringify(db);
        fs.writeFile('./login_info.json',db,(err,data)=>{
            next();
        })
    })
}
app.post('/login', inputverify, existcheck, (req,res)=>{
    res.send('succesfully created account');
})

// global cathch 
app.use((err,req,res,next)=>{
   console.log('there was an error') 
})