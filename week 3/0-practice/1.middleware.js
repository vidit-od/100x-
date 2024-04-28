// without using middlewares 

/*

const express = require('express')
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send('hello ')
})

app.post('/',(req,res)=>{
    const ID = req.body.ID
    const Username = req.body.Username
    const Password = req.body.Password
    console.log(ID,Username,Password)
    if(Username != 'vidit' || Password != 'vidit1234'){
        res.status(411).send('invalid credentials')
        return
    }
    if(ID >= 2){
        res.status(411).send('incorrect input');
        return
    }
    res.status(200).send('correct, u have entered');
})

app.listen(3000)

*/

// using middleware to implement DRY 

const express = require('express')
const app = express();
app.use(express.json());
app.listen(3000);
// auth check 
function middleware_Auth(req,res,next){
    const Username = req.body.Username
    const Password = req.body.Password

    if(Username != 'vidit' || Password != 'vidit1234444'){
        res.status(411).send('Incorrect credential ');
    }
    next();
}
// input check 
function middleware_inputcheck(req,res,next){
    const ID = req.body.ID

    if( ID >= 2){
        res.status(411).send('Incorrect input');
    }
    next();
}
// get logic 
app.get('/',(req,res)=>{
    res.status(200).send('hello')
})
// post logic 
app.post('/',middleware_Auth,middleware_inputcheck,(req,res)=>{
    res.status(200).send('correct, u have entered')
})

// global catch 
app.use((err,req,res,next)=>{
    console.log('error ')
});


//middle wares are chained and used one after another, i.e. 
// first middleware_auth is called , if it reaches till next()
// then next is middleware_inputcheck, if it reaches till next()
// main post logic is reached 
// in end we have a global catch , used to prevent users form getting more info about the error , for security purposes