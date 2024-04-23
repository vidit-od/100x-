// problem statement: 

// you need to create 4 routes 

// get: user can check how many kidneys they have and how many are healthy 
// post: add new kidney
// put : heal unhealthy kidney 
// delete: remove unhealthy kidney 

// assume that there is only 1 user in this system 

const express = require('express')
const app = express();

app.listen(3000)
let user = [
    {
        name : 'vidit' ,
        kidney : [
            {health_status : false}
        ]
    }
]

// get lofic 
app.get('/',function(req,res){
    let user_kidney_array  = user[0].kidney
    let total = user_kidney_array.length
    let healthy = 0;
    user_kidney_array.forEach(function(element){
        if (element.health_status){
            healthy++;
        }
    })
    if(healthy == 0){
        res.send(
        `<p>Hello ${user[0].name} welcome to hospital simulator!!</p>
         <p>You have <B>${total}</B> kidneys</p>
         <p>Out of which <B>${healthy}</B> are healthy</p>
         <p style ="color:red;">Danger !! No Healthy kidneys, User Postman to Add healthy kidney immediately !! </p>`);
    }
    else{
        res.send(
            `<p>Hello ${user[0].name} welcome to hospital simulator!!</p>
             <p>You have <B>${total}</B> kidneys</p>
             <p>Out of which <B>${healthy}</B> are healthy</p>`);        
    }
})

// needed to parse body
app.use(express.json())
// Post logic 
app.post('/',function(req,res) {
    const new_kidney = req.body.health_status;
    user[0].kidney.push({
        health_status: new_kidney
    });
    res.json({
        msg:'done'
    })
})

// put logic 
app.put('/',function(req,res){
    let user_kidney_array  = user[0].kidney
    let count = 0;
    user_kidney_array.forEach(function(element){
        if(element.health_status == false){
            element.health_status = true;
            count++;
        }
    })

    if(count == 0){
        res.json({
            msg: 'all kidney already healthy'
        })
    }
    else{
    res.json({
        msg: 'all kidneys healed'
    })}
})

app.delete('/',function(req,res){
    let user_kidney_array  = user[0].kidney
    let new_user_kidney_array = []
    user_kidney_array.forEach(function(element){
        if(element.health_status){
            new_user_kidney_array.push(element);
        }
    })
    user[0].kidney = new_user_kidney_array;
    
    if (new_user_kidney_array.length == user_kidney_array.length){
        res.json({
            msg:"all kidneys are already healthy"
        })
    }
    else{
    res.json({
        msg: 'all unhealthy kidney removed'
    })}
})