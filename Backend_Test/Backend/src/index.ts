import express from "express"
import type { Request, Response } from "express"
import AuthRouter from "./routes/Auth"
import { connectDB } from "./config/db"
import ClassRouter from "./routes/Class"
import StudentsRouter from "./routes/Students"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/class", ClassRouter);
app.use("/students", StudentsRouter);
async function start() {
    await connectDB()


    app.listen( PORT, ()=>{
        console.log(`Backend running on PORT ${PORT}`)
    })
}

start()
