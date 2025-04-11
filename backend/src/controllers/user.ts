import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../utils/utility_class.js";

export const createUser = TryCatch(
  async (req, res, next) => {

    const { name, email, gender, dob, _id, photo } = req.body;
    
    let user = await User.findById(_id);
    
    if(user){
      return res.status(200).json({success:true,message:`Welcome, ${user.name}`})
    }
    
    if(!_id||!name||!email||!gender||!dob||!photo){
      return next(new ErrorHandler("All fields required",400))
    }
    
    user = await User.create({
      name,
      email,
      gender,
      dob: new Date(dob),
      _id,
      photo,
    });
    
    res.status(200).json({ message: `Welcome ${user.name}` });
  }
);

export const getAllUsers = TryCatch(
  async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({success:true,users});
  
  }
)

export const getUser = TryCatch(async(req,res,next)=>{
  const {id} = req.params;
  const user = await User.findById(id)
  if(!user){
    return res.status(400).json({success:false,message:"Invalid ID"})
  }
  return res.status(200).json({success:true,user})
})

export const deleteUser = TryCatch(async(req,res,next)=>{
  const {id} = req.params;
  const user = await User.findById(id);
  if(!user){
    return res.status(400).json({success:false,message:"Invalid ID"})
  }
  await User.deleteOne()

  res.status(200).json({success:true,message:"User delete successfully."})
})