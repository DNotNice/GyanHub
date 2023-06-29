const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true ,
        unique:true
    },
    password:{
        type:String ,
        required:true 
    } ,
    purchases:[{
        purchaseId : { type : mongoose.Schema.Types.ObjectId ,
                        ref: "purchases"
                    }
    }] ,
    courses: [{
        courseId : { type:mongoose.Schema.Types.ObjectId  ,
                    ref : "courses"
                }
    }]
    
} , {timestamps : true })

const USER  = mongoose.model('user' , userSchema)
module.exports = USER