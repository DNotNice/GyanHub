const { v4: uuidv4 } = require('uuid');
const ADMIN = require('../models/admin')
const COURSE = require('../models/course')
async function adminSignup(req ,res){

    const username  = req.body.username 
    const password  = req.body.password
    if(!email || !password ) return res.status(400).json({
        message : "missing credentials"
    })
    const user = ADMIN.findOne({email})
    if(!user){
      await  ADMIN.create({
            username : username,
            password : password,
            courses : []
        })
    }else{
        return res.status(400).json({
            message: 'user already exists'
        })
    }
    return res.status(200).json({
        message : 'admin created successfully',
        token : Date.now()
    })
}

async function adminLogin(req ,res) {
    const usern = req.body.username
    const pass = req.body.password
    const user = await ADMIN.findOne({
        usern ,pass
    })
    if(!user)return res.status(400).json({message:'invalid login credentials'})
    return res.staus(200).json({
        message : 'user login successful',
        token : Date.now()
    })
}

async function addCourse(req ,res){
    const courseId = uuidv4()
    const title = req.body.title 
    const desc = req.body.desc 
    const price = parseInt(req.body.price , 10) 
    const imageLink = req.body.imageLink
    const published = true
    const userId = req.user
    try {
        const course = await COURSE.create({
            courseId : courseId, title  :title , courseDesc : desc , price : price, imageLink : imageLink , published 
        })
        await ADMIN.findOneAndUpdate({
            userId
        }, {$push:{
            courses: {
                courseId : course._id
            }
        }
        })
        res.status(200).json({
            message : 'course created successfully' ,
            courseId :  course._id
        })

    } catch (error) {
        return res.status(400).json({
            message : 'error occurred',
            err : error
        })
    } 
}
async function updateCourse(req, res){
    const courseId = (req.params.courseId).substring[1];
    const title = req.body.title 
    const courseDesc = req.body.desc
    const price = parseInt(req.body.price,10)
    const updatedLink = req.body.link 
    const published = false 
    try {
    const course = findOneAndUpdate({
        courseId
    }, {
        title:title , courseDesc:courseDesc , price:price , updatedLink:updatedLink , published ,published 
    } , {
        new:true 
    })
} catch (error) {
    return res.status(400).json({
        message : 'some error occurred',
        err : error
    })       
}
}
async function allCourses(req ,res){
    const userId  = req.user ;
    try {
    const user = await ADMIN.findOne({ userId});
    const adcourses = user.courses
    const AdminCourses = []
    for(const course of adcourses){
        const course = await COURSE.findOne({course})
        AdminCourses.push(course)
    }
    return res.status(200).json({
        message :"all courses fetched",
        data : AdminCourses
    })

    } catch (error) {
        
    }
}


module.exports = {adminSignup, adminLogin , addCourse , updateCourse,allCourses}