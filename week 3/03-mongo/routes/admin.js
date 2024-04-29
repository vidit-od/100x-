const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db');
// Admin Routes
router.post('/signup',async(req, res) => {
    // Implement admin signup logic
    const ExistingAdmin = await Admin.findOne({username:req.headers.username});
    if(ExistingAdmin){
        return res.status(401).json({
            msg: "Username occupied"
        })
    }

    await Admin.create({
      username: req.headers.username,
      password: req.headers.password  
    })

    res.status(200).json({
        msg: "admin created"
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic\
    const NewCourse =  await Course.create({
        title : req.body.title,
        description : req.body.description,
        imagelink : req.body.imagelink,
        price : req.body.price
    })

    res.status(200).json({
        msg : `Course created with id ${NewCourse.id}`
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        msg : response
    })
});

module.exports = router;