import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/backend-test")
        console.log("Db connected")
    }
    catch (error){
        console.error("could not connect to db")
        process.exit(1);
    }
}
