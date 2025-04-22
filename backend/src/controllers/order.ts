import { NewOrderRequestBody } from "./../types/types.js";
import { Request } from "express";
import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/order.js";
import { reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility_class.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subTotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (
      !shippingCharges ||
      !orderItems ||
      !user ||
      !subTotal ||
      !tax ||
      !shippingCharges ||
      !discount ||
      !total
    ) {
      return next(new ErrorHandler("Provide all fields", 400));
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subTotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    res.status(200).json({ success: true, order });
  }
);

export const myOrders = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  const orders = await Order.find({ user: id }).populate("user", "name");
  res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, orders });
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name");
  res.status(200).json({ success: true, order });
});

export const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  let message;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("order not found", 404));
  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
    default:
      order.status = "Delivered";
      break;
  }
  await order.save();

  res.status(200).json({ success: true});
});

export const deleteOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  res.status(200).json({ success: true, message:"Order deleted successfully"});
});
  