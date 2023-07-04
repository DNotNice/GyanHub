const {adminSignup , adminLogin , addCourse , updateCourse, allCourses} = require('../controller/admin')
const {authenticateJWT} = require('../middleware/JWT')
const express= require('express')
const router = express.Router()

router.post('/signup' , adminSignup);
router.post('/login' , adminLogin);
router.post('/courses' ,authenticateJWT, addCourse);
router.put('/courses/:courseId' , authenticateJWT, updateCourse)
router.get('/courses' ,authenticateJWT, allCourses)



module.exports = router