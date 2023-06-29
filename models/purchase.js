const mongoose = require('mongoose')

const purchSchema = mongoose.Schema({
    purchaseId : {
        type:String ,
        required:true ,
    },
    courseId : {
               type:  mongoose.Schema.Types.ObjectId , 
               ref:   'courses',
               required:true
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required:true
    }    
} , {timestamps : true})

const PURCHASE = mongoose.model('purchase' , purchSchema)
module.exports = {PURCHASE}