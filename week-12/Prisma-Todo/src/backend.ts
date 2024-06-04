import express from 'express';
import { indexRouter } from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/',indexRouter);

app.listen(PORT, ()=>{
    console.log(`Listining at PORT ${PORT}`);
})