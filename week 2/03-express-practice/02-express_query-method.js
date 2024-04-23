const express = require('express')
const app = express();

function logic(n){
    let sum = 0;
    for(let i =0; i< n; i++){
        sum+= i;
    }
    return sum;
}

// now we can read inputs from url 
// at localhost:3000?n= any num 
// here we are giving a value n to the query 
// req.query.n will recieve this input from the url 

app.get('/', function(req,res){
    let n = req.query.n;
    let ans = logic(n);

    res.send(`ans : ${ans}`);
})

app.listen(3000)