require("dotenv").config({path:"./.env"})
const express = require("express")
const {connect} = require('./db/index')
const app = express();
const port = 2999

app.listen(port , async()=>{
    await connect()
    console.log('mongodb  connected successfully')
    console.log(`server is running on ${port}`)
})