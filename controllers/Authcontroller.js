// const req = require('express/lib/request');
const User =require('../models/usermodel.js');
const jwt=require('jsonwebtoken')

const Apperror=require('../appError.js');
const { farsiLocales } = require('validator/lib/alpha');


  const Signtoken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN  
  });
}
exports.signup=async (req,res,next)=>{


    try{
        const newUser=await User.create(req.body);
         
        const token=Signtoken(id);
  


      res.status(201).json({
        status:'success',
        token,
        data:{
          newUser
        }
      })}
      catch(err){
        res.status(400).json({
          status:'fail',
          message:err
        })  
      }
    };


    exports.login=async(req,res,next)=>{
      const {email,password}=req.body;
      
      // if email password exist
      if(!email || !password){
        return next(new Apperror('please provide email and password',400));
      }
      
      try{
        const user= await User.findOne({email}).select('+password');
        console.log(password);
        console.log("ff");

        const correct =await (user.correctpassword(password,user.password))
        
console.log(correct);

    if(!user || !correct)
        {
          return next(new Apperror('Incorrect email or password',401))
        }
        
        
        console.log(user.password);
        


        console.log(correct);
  console.log('sffs');
        const token=Signtoken(user._id);
        res.status(200).json({
          status:'success',
          token
        })}
catch(err){
  status:'fail',
  err
}
        
    }