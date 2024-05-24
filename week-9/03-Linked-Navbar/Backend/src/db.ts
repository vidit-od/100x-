import * as dotenv from 'dotenv';
dotenv.config();


import mongoose, { model } from "mongoose";
import { number } from 'zod';
mongoose.connect(process.env.MongooseUrl + 'Linkedin')

const UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength:5,
    },
})

const NavSchema = new mongoose.Schema({
    UserID:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    Home: {
        type: Number,
        required: true,
        unique:false,
    },
    Notification: {
        type: Number,
        required: true,
        unique:false,
    },
    Connections: {
        type: Number,
        required: true,
        unique:false,
    },
    Messages: {
        type: Number,
        required: true,
        unique:false,
    }
})

export const User = mongoose.model('User', UserSchema);
export const Navbar = mongoose.model('Navbar', NavSchema);
