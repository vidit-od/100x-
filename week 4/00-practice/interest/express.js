const express = require('express')
const app = express();
const cors = require('cors');

app.listen(3000);
app.use(cors());
app.use(express.json())


app.get('/SimpleInterest',(req,res)=>{
    const amount = parseInt(req.query.amt)
    const duration = parseInt(req.query.yrs)
    const interest = parseInt(req.query.intr)

    let returns = (amount*duration*interest)/100;
    let total = amount + returns;
    return res.status(200).send(total.toString());
})
