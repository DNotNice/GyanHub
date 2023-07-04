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
             type: mongoose.Schema.Types.ObjectId ,
             ref :'course'
    }]
} , {timestamps:true}
)
const ADMIN = mongoose.model('admin' , adminSchema)
module.exports  = ADMIN 