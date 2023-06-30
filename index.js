require("dotenv").config({path:"./.env"})
const express = require("express")
const {connect} = require('./db/index')
const staticRouter = require('./routes/staticRout')
const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const app = express();
const port = 2999

app.use('/user' , userRoute)
app.use('/admin' , adminRoute)
app.use('/' , staticRouter)

app.listen(port , async()=>{
    await connect()
    console.log('mongodb  connected successfully')
    console.log(`server is running on ${port}`)
})