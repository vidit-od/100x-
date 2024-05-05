const mongoose = require('mongoose');
// for now exposing the link is ok because it is not a production software 
// in real world we have to use .envs and import this from there 
// this saves important data to be leaked on github code 
mongoose.connect("mongodb+srv://vidit_od:CyFAqtksDorcvy86@cluster0.x9rowkm.mongodb.net/MernTodo")

const TodoSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Completed: Boolean
})

const UserSchema = new mongoose.Schema({
    Username: String,
    Password: String,
})

const Todo = mongoose.model('Todo', TodoSchema)
const User = mongoose.model('Users',UserSchema);

module.exports={
    Todo,
    User,
}