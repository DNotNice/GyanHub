const express = require('express')
const router= express.Router();
const { userSignup , userLogin , allCourses, purchaseCourse , UserCourses} = require('../controller/user')
const {authenticateJWT} =require('../middleware/JWT')

router.post('/signup' , userSignup)
router.post('/login' , userLogin)
router.get('/courses' , authenticateJWT,allCourses)
router.post('/courses/:courseId',authenticateJWT , purchaseCourse)
router.get('/purchasedCourses' , authenticateJWT ,UserCourses)

module.exports = router;