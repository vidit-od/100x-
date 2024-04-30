const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require('../db');
const jwt = require('jsonwebtoken');
let jwt_secret = require('../jwttoken.js');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const ExistingUser = await User.findOne({
        username: req.headers.username
    });
    if(ExistingUser){
        return res.json({
            msg: 'Username Occupied'
        })
    }

    await User.create({
        username: req.headers.username,
        password: req.headers.password
    });

    res.json({
        msg: "New User Created "
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    console.log(jwt_secret);
    const ExistingUser = await User.findOne({
        username: req.headers.username,
        password: req.headers.password
    })
    if(ExistingUser){
        const token =  jwt.sign({
            username: req.headers.username,
            password: req.headers.password
        },jwt_secret)

        res.json({
            token
        })
    }
    else{
        return res.json({
            msg: 'invalid'
        })
    }
});

router.get('/courses', userMiddleware ,async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.status(200).json({
        msg: response
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const CheckCourse = await Course.findById(courseId);
    if( CheckCourse == null){
        return res.json({
            msg: 'No course with this ID exist'
        })
    }
    let username = (jwt.decode(req.headers.authorization.split(' ')[1])).username;
    
     const Update_list = await User.updateOne({ username:username , PurchasedCourse: {$ne : courseId}}, 
         {$push : {PurchasedCourse: courseId}})
    
     if( Update_list.matchedCount == 0) 
         return res.json({msg: 'already purchased'})
    
     res.json({
         msg: "purchase complete"
     });
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const CurrUser = await User.findOne({
        username:req.headers.username
    })
    res.json({
        msg: CurrUser.PurchasedCourse
    })
});

module.exports = router