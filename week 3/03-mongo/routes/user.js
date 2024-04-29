const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Admin,User,Course} = require('../db');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const ExistingUser = await User.findOne({username:req.headers.username});
    if(ExistingUser){
        return res.status(401).json({
            msg: "Username occupied"
        })
    }

    await User.create({
      username: req.headers.username,
      password: req.headers.password  
    })

    res.status(200).json({
        msg: "user created"
    })

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.status(200).json({
        msg: response
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

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