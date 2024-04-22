const fs = require('fs')
let file = fs.readFile("a.txt",'utf-8', function(err,req){
    console.log(req)
});


