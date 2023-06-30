const {adminSignup , adminLogin , addCourse , updateCourse, allCourses} = require('../controller/admin')
const express= require('express')
const router = express.Router()

router.post('/signup' , adminSignup);
router.post('/login' , adminLogin);
router.post('/courses' , addCourse);
router.put('/coureses/:courseId' , updateCourse)
router.get('/courses' , allCourses)



module.exports = router