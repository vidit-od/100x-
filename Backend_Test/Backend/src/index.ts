import express from "express"
import type { Request, Response } from "express"
import AuthRouter from "./routes/Auth"
import { connectDB } from "./config/db"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/auth", AuthRouter);

async function start() {
    await connectDB()


    app.listen( PORT, ()=>{
        console.log(`Backend running on PORT ${PORT}`)
    })
}

start()
