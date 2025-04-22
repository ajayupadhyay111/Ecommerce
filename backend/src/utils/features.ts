    import { Product } from "../models/product.js";
import { OrderItems } from "../types/types.js";

export const reduceStock = async (orderItems: OrderItems[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};


export const calculatePercentage = (thisMonth:number,lastMonth:number)=>{

 if(lastMonth === 0) return Number(thisMonth*100);
  let percent = ((thisMonth-lastMonth)/lastMonth)*100;
  return Number(percent.toFixed(0));
}