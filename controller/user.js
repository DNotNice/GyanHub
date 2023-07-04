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
    const emp  = req.params.courseId
    const cousrseId = emp.substring(1)
    const username = req.user.username
    const userid  = req.user._id
    try {
        const wcourse = await COURSE.findOne({ _id : cousrseId})
        const user = await USER.findOne( {_id : userid})     
        user.courses.push(wcourse._id)
        await user.save(); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : 'err occ'})   
    }
    return res.status(200).json({
        message :'course purchased successfully',
        courseId : cousrseId,
        purchasedBy : username
    })
}
async function UserCourses(req, res){
     const user = await USER.findOne({ _id : req.user._id}).populate('courses')
     if(user){
        return res.status(200).json({
            user: user.username,
            UserCourses: user.courses
        })
     }else{
        return res.status(400).json({
            message : "Uset not found"
        })
     }
}

module.exports = {userSignup , userLogin, allCourses , purchaseCourse , UserCourses}