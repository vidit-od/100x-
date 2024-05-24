import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

const PORT:number = 3000;

import RootRouter from './routes/index';
app.use('/',RootRouter);   

app.listen(PORT,()=>{
    console.log(`Listining at Port ${PORT}`);
})
