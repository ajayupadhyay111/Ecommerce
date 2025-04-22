import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility_class.js";
import { ControllerType } from "../types/types.js";
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  err.message ||= "Internal Server Error";
  if(err.name === "CastError"){
    err.message = "Invalid ID"
  }
  res.status(statusCode).json({ success: false, message: err.message });
};

export const TryCatch = (func: ControllerType) => (req:Request,res:Response,next:NextFunction) => {
     Promise.resolve(func(req,res,next)).catch(next)
  };
