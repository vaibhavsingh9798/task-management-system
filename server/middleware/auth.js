const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.authentication = async (req,res) =>{
    
    const token = req.headers.authorization ;
    if(token){
      let payload = jwt.verify(token,process.env.SECRET_KEY)
      res.user = payload.email ;
      next();
    }else{
        return res.status(401).json({message:'unauthorized'})
    }
}