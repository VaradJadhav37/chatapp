const jwt=require('jsonwebtoken');
const User = require('../models/usermodel.js');
const { request } = require('express');

const protectRoute=async (req,res,next)=>{
    try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({message:"Unauthorized"}); 
    }
    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({message:"Not Found"});
    }
    req.user=user;
    next();
}
catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
    
}
}
module.exports = protectRoute;