const { v4: uuidv4 } = require('uuid');
const {signJWT} = require('../middleware/JWT')
const ADMIN = require('../models/admin')
const COURSE = require('../models/course')
async function adminSignup(req ,res){
    let token =''
    const username  = req.body.username 
    const password  = req.body.password
    if(!username || !password ) return res.status(400).json({
        message : "missing credentials"
    })
    const user = await ADMIN.findOne({username})
    if(!user){
     const admin =   await  ADMIN.create({
            username : username,
            password : password,
            courses : []
        })    
       token = await signJWT(username , admin._id , 'admin')
    }else{
        return res.status(400).json({
            message: 'admin already exists'
        })
    }
       
    return res.status(200).json({
        message : 'admin created successfully',
        token :  token
    })
}

async function adminLogin(req ,res) {
    const { username  , password} = req.body;
    const admin = await ADMIN.findOne({username })
    let passCheck = false
    if(admin){
        console.log('found you')
         passCheck =  await admin.comparePassword(password)
         if(!passCheck) return res.status(401).json({
        message:'wrong password'
       })
    }
    if(!admin){
        return res.status(401).json({message:'invalid login credentials'})}
    const admintoken = await signJWT(username , admin._id , 'admin') ;
    return res.status(200).json({
        message : 'admin login successful',
        token : admintoken
    })
}
async function meRoute(req,res){
    console.log(req.user.username)
    res.json({
        username: req.user.username
    })
}

async function addCourse(req ,res){
    const courseId = uuidv4()
    const title = req.body.title 
    const desc = req.body.description 
    const price = parseInt(req.body.price , 10) 
    const imageLink = req.body.imageLink
    const published = true
    const userId = req.user._id
    try {
        const course = await COURSE.create({
            courseId : courseId, courseTitle :title , courseDesc : desc , price : price, imageLink : imageLink , published 
        })
       const pushed =  await ADMIN.findOne({ _id:userId})
        pushed.courses.push(course._id)
        await pushed.save();
        console.log(pushed.courses) 
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
    const courseId = req.params.courseId;
    const title = req.body.title 
    const courseDesc = req.body.Desc
    const price = parseInt(req.body.price,10)
    const imageLink = req.body.image 
    const published = true
    try {
    const course = await COURSE.findOneAndUpdate({
        courseId:courseId
    }, {
        courseTitle:title , courseDesc:courseDesc , price:price , imageLink:imageLink , published  
    } , {
        new:true 
    })  
  

   return res.status(202).json({
        message :"course updated successfully",
        courseId : courseId 
    })
} catch (error) {
    console.log(error)
    return res.status(400).json({
        message : 'some error occurred',
        err : error
    })       
}
}

async function allCourses(req ,res){
    const userId  = req.user._id ;
    try {
    const user = await ADMIN.findOne({_id: userId }).populate('courses');
    return res.status(200).json({
        message :"all courses fetched",
        courses : user.courses
    })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"error occurred",
            err:error
        })
    }
}
async function getCourse(req ,res){
    try {
    const courseId = req.params.courseId;
    const course = await COURSE.findOne({courseId}) 
    res.json({
        course
    })   
    } catch (error) {
        console.log(error)
        res.json({
            message:'something went wrong'
        })
    }
}


module.exports = {adminSignup, adminLogin , addCourse , updateCourse,allCourses ,meRoute,getCourse}