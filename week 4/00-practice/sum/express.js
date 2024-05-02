const express = require('express');
const cors = require('cors');
const app = express();

app.listen(3000);
app.use(cors());
app.get('/sum',(req,res)=>{
    const a = req.query.a;
    const b = req.query.b;

    let sum = parseInt(a)+parseInt(b);
    res.status(200).send(sum.toString());
})