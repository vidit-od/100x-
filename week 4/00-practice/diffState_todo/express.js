const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./data.js')


app.use(cors());
app.use(express.json());
app.listen(3000);

function RandomSelector(array){
    const length = array.length
    let result = [];
    // randomly select size of new state
    let NewLength = Math.floor(Math.random()* length);
    // indices is a set which contatins all indexes of objects already included in result
    let indices = new Set();
    while (indices.size < NewLength){
        let index = Math.floor(Math.random()* length);
        if(!indices.has(index)){
            indices.add(index);
            result.push(array[index])
        }
    }
    result.sort((a,b)=>a.id - b.id);
    return result;
}

app.get('/getTodoState',(req,res)=>{
    const CurrTodo = RandomSelector(data);
    res.status(200).json(CurrTodo);
})