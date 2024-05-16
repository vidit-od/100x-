const mongoose = require('mongoose');
const { object, number } = require('zod');

require('dotenv').config();

mongoose.connect(process.env.MongooseUrl + 'Paytm')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstname: {
        type: String,
        require: true,
        unique: false,
        trim:true,
    },
    lastname: {
        type: String,
        require: false,
        unique: false,
        trim:true,
    },
    password: {
        type: String,
        require: true,
        unique: false,
        trim:true,
        minLength:5
    }
})

const BankSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    balance:{
        type: Number,
        require: true,
    }
})

const User = mongoose.model('User',UserSchema);
const Bank = mongoose.model('Bank', BankSchema);

module.exports={
    User,
    Bank
}