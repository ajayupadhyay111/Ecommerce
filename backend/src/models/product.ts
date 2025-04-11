import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide product name"]
    },
    photo:{
        type:String,
        required:[true,"Provide product image"]
    },
    price:{
        type:Number,
        required:[true,"Provide product price"]
    },
    stock:{
        type:Number,
        required:[true,"Provide stock of product"]
    },
    category:{
        type:String,
        required:[true,"Provide product category"],
        trim:true
    }
},{
    timestamps:true
})

export const Product = mongoose.model("Product",schema)