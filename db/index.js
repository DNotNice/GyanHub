const mongoose = require('mongoose')
mongoose.set('strictQuery' , false)

const connect = async()=>{
    await mongoose.connect('mongodb://localhost/gyanHub')
}
module.exports = {connect}