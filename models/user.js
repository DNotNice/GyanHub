const mongoose = require('mongoose')
const  bcrypt = require('bcrypt')
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
        ref : 'course'
    }]
    
} , {timestamps : true })
userSchema.pre('save' , function( next){
    if(!this.isModified('password')) return next()
    bcrypt.hash(this.password , 10 ,(err ,Hashedpassword)=>{
        if(err) return next(err)
        this.password = Hashedpassword
        next();
    })
})
userSchema.methods.comparePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
const USER  = mongoose.model('user' , userSchema)
module.exports = USER