const express = require('express');
const cors = require('cors');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000

const rootRouter = require("./routes/index");
app.use('/api/v1/', rootRouter);

app.listen(PORT, (err) => {
    if(err) return console.log('There was some error')
    return console.log('Express running on PORT'+PORT);
})