const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true ,
        unique:true
    },
    password:{
        type:String ,
        required:true 
    } ,
    purchases:[{
        type : mongoose.Schema.Types.ObjectId ,
        ref: "purchase"
                    
    }] ,
    courses: [{
        type:mongoose.Schema.Types.ObjectId  ,
        ref : "course"
    }]
    
} , {timestamps : true })

const USER  = mongoose.model('user' , userSchema)
module.exports = USER