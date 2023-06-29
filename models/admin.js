const mongoose = require('mongoose')

const adminSchema  = mongoose.Schema({
    username: {
        type :String ,
        required : true,

    },
    password : {
        type:String,
        required:true 
    } ,
    courses: [{
         courseId : {
             type: mongoose.Schema.Types.ObjectId ,
             ref :'courses'
        }
    }]
} , {timestamps:true}
)
const ADMIN = mongoose.model('admin' , adminSchema)
module.exports  = ADMIN 