const {adminSignup , adminLogin , addCourse , updateCourse, allCourses ,meRoute,getCourse} = require('../controller/admin')
const {authenticateJWT} = require('../middleware/JWT')
const express= require('express')
const router = express.Router()

router.post('/signup' , adminSignup);
router.post('/login' , adminLogin);
router.get('/me' , authenticateJWT , meRoute)
router.post('/courses' ,authenticateJWT, addCourse);
router.put('/courses/:courseId' , authenticateJWT, updateCourse)
router.get('/courses' ,authenticateJWT, allCourses)
router.get('/courses/:courseId' , authenticateJWT , getCourse)



module.exports = router