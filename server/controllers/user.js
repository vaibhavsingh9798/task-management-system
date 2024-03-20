const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signup = async (req,res) =>{
   const {email,password,name} = req.body
   try{
  const isExist = await User.findOne({email})
   if(!isExist){
      const saltRound = parseInt(process.env.SALT_ROUND );
      let hashPassword = await bcrypt.hash(password,saltRound)
      let response = await User.create({name,email,password:hashPassword})
    return  res.status(201).json({message:'user created successfull',success:true,response})
   }
   else{
    return  res.status(400).json({message:'User already exist',success:false});
   }
   }catch(err){   
  return  res.status(500).json({message:'Internal Server Error',success:false,err})
   }
}

exports.sigin = async (req,res) =>{         
   const {email,password} = req.body
   try{
  const isExistUser = await User.findOne({email})
   if(isExistUser){ 
      let isValidPassword = await bcrypt.compare(password,isExistUser.password)
      if(isValidPassword){
         const token = jwt.sign({email:email},process.env.SECRET_KEY ,{expiresIn:'1h'})
      res.status(200).json({message:'user login successfull',success:true,token})
      }else{
         return res.status(401).json({ message: 'Invalid credentials' });
      }
   }else{
      return res.status(404).json({ message: 'User not found' });
   }
   }catch(err){
  return   res.status(500).json({message:'Internal Server Error',success:false})
   }
}