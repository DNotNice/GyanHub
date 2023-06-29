const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    courseId : {
        type:String, 
        required:true ,
        unique : true 
    } ,
    courseTitle:{
        type:String ,
        required:true 
    },
    courseDesc : {
        type:String ,
        required:true 
    } ,
    price :{
        type: Integer ,
        required :true 
    } ,
    imageLink: {
        type:String ,
        required:true 
    }, 
    published : {
        type: Boolean ,
        required : true
    }   
} , {timestamps : true }
)
const COURSE = mongoose.model('course' ,courseSchema )
module.exports = COURSE 