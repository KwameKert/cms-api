const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req,res, next) =>{
    try{
        const token = req.header("Authorization").replace('Bearer ', '');
        const decoded = await jwt.verify(token, 'cmssecret');
        const user = await User.findOne({where: {username: decoded.username}})
        console.log("middleware here");

        if(user){
            req.user = user
            req.token = token
        }else{
            throw new Error();
        }
       

    }catch(e){
        return res.status(401).send("{error: 'Please authenticate ' }")
    }
    next()
}


module.exports = auth

