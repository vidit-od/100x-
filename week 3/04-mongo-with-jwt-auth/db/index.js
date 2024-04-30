const mongoose = require('mongoose');
const { string } = require('zod');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vidit_od:CyFAqtksDorcvy86@cluster0.x9rowkm.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    PurchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    imagelink: String,
    price: Number,

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}