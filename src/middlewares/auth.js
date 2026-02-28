const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const auth = async (req , res , next )=>{
    try {
        // read the token form the cooklies 
        const {token} = req.cookies;
        if(!token){
            throw new Error('Token is not valid!!!!!!');
        }
        //validate the token
        const decoded =  jwt.verify (token , "asdfghjkl");
        // find the user with the token 
        const user = await User.findById(decoded._id);

        if(!user){
            throw new Error('User not found');
        }   
        req.user = user;
        next();     
    }
    catch(error){
            res.status(401).json({ error: error.message });
    }
}

module.exports = auth;