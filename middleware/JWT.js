// implement a jwt token and then store the admin id  in req.user 
// verify the admin id  
//const{SECRET} = require('../config/config')
const SECRET = 'CSWbyDP@1124'
const jwt = require('jsonwebtoken')

const authenticateJWT = async(req, res ,next)=>{   
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token , SECRET , (err ,user)=>{
            if(err) return res.sendStatus(403)
        
        req.user = user 
        console.log(`${req.user.role} identified`)
        next();
        })
    }else{
        res.sendStatus(401)
    }
}
async function signJWT(username , _id , role){
    return  jwt.sign({username , _id , role : role} , SECRET , {expiresIn:'1h'})

}

module.exports = {authenticateJWT , signJWT}
