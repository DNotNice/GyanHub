const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

adminSchema.pre('save' , function( next){
    if(!this.isModified('password')) return next()
    bcrypt.hash(this.password , 10 ,(err ,Hashedpassword)=>{
        if(err) return next(err)
        this.password = Hashedpassword
        next();
    })
})
adminSchema.methods.comparePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
const ADMIN = mongoose.model('admin' , adminSchema)
module.exports  = ADMIN 