const { v4: uuidv4 } = require('uuid');
const COURSE = require('../models/course')
const {signJWT} = require('../middleware/JWT')
const USER = require('../models/user')
async function userSignup(req ,res){
    let token = ''
    const username  = req.body.username 
    const password  = req.body.password
    if(!username || !password ) return res.status(400).json({
        message : "missing credentials"
    })
    const user = await USER.findOne({ username})

    if(!user){
      const addeduser = await  USER.create({
            username : username,
            password : password,
            courses : [] ,
            purchases : []
        })
         token = await signJWT(username , addeduser._id ,'user')
    }else{
        return res.status(400).json({
            message: 'user already exists'
        })
    }
    return res.status(200).json({
        message : 'user created successfully',
        token : token
    })
}

async function userLogin(req ,res){
        const { username} = req.headers;
        const user = await USER.findOne({
            username 
        })
        if(!user)return res.status(400).json({message:'invalid login credentials'})
        const token = await signJWT(username , user._id ,'user')
        return res.status(200).json({
            message : 'user login successful',
            token : token
        })
}

async function allCourses(req,res){
    const courses  = await COURSE.find({});
    return res.status(200).json({
        courses
    })
}

async function purchaseCourse(req, res){
    const course = await COURSE.findById(req.params.courseId)
    if(course){
        const user = await USER.findOne({ username : req.user.username});
         user.courses.push(course._id);
         await user.save(); 
    }else return res.status(402).json({ message : 'courseId empty or not valid'})
    return res.status(200).json({
        message :'course purchased successfully',
        courseId : course
    })
}
async function UserCourses(req, res){
     const user = await USER.findOne({ username : req.user.username}).populate('courses')
     if(user){
        return res.status(200).json({
            message:'all user purchased courses',
            UserCourses: user.courses
        })
     }else{
        return res.status(400).json({
            message : "Uset not found"
        })
     }
}

module.exports = {userSignup , userLogin, allCourses , purchaseCourse , UserCourses}