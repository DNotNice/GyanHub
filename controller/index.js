const express = require('express')

function homePage(req ,res){
    return res.end(`
    <html>
        <h1>  Welcome to course selling website</h1>
        <h3> If you are a creator , login as an admin to create your course <br/> 
             If you are a learner , login as a user 
        </h3>
    </html>`
    )
}

module.exports = {homePage}