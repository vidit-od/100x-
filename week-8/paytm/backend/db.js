const mongoose = require('mongoose');

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

const User = mongoose.model('User',UserSchema);

module.exports={
    User
}