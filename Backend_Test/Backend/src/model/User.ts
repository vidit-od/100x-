import mongoose, { Types, type HydratedDocument, type InferSchemaType } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    role: {
        type : String,
        enum : ["teacher" , "student"],
        required : true
    }
})

export type IUser = InferSchemaType<typeof userSchema> & {
    _id : Types.ObjectId
};

// bcrypt middleware
userSchema.pre("save", async function (){
    const user = this as HydratedDocument<IUser>;

    if(!user.isModified("password")) return;

    user.password = await bcrypt.hash(user.password, 10);
})

export const User = mongoose.model<IUser>("User", userSchema)
