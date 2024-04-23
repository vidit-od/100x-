// expressis not built-in ; similar to fs, we have to first import it 
// importing express
let express = require('express')
const app = express();

// the logic which we want to expose to http server 
function logic(n){
    let sum = 0;
    for(let i =0; i< n; i++){
        sum+= i;
    }
    return sum;
}

// declaring http server 
// we are defining 
// route : '/'
// when we recieve a get request on route '/' we do this 
// function calledback here always has 2 attributes to : req,res 
// res is for response 
// res.send to display data on that route

app.get('/', function(req,res){
    let ans = logic(10000000);
    res.send(`<h1>hello client !!</h1> \nThe result of computation ${ans}`)

})

// listining to port 3000
app.listen(3000);