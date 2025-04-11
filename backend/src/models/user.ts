import mongoose, { Document } from "mongoose";
import validator from "validator";

interface IUser extends Document{
    _id:string,
    email:string,
    name:string,
    photo:string,
    role:"admin"|"user",
    gender:"male"|"female",
    dob:Date,
    createdAt:Date,
    updatedAt:Date,
    age:number // virtual attribute
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already exist"],
      validate: validator.default.isEmail,
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter date of birth"],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User",schema)

