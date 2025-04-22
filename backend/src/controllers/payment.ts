import { TryCatch } from "../middleware/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility_class.js";

export const newCoupon = TryCatch(async (req, res, next) => {
  const { coupon, amount } = req.body;
  if (!coupon || !amount) {
    return next(new ErrorHandler("Plese enter coupon and amount", 400));
  }
  await Coupon.create({ coupon, amount });
  res
    .status(201)
    .json({ success: true, message: `Coupon ${coupon} created successfully` });
});
export const discount = TryCatch(async (req, res, next) => {
  const { coupon } = req.query;
  if (!coupon) {
    return next(new ErrorHandler("Plese enter coupon", 400));
  }
  let discount = await Coupon.findOne({ coupon });
  if (!discount) {
    return next(new ErrorHandler("Invalid coupon", 400));
  }
  res.status(201).json({
    success: true,
    message: `Coupon ${coupon} applied`,
    discount: discount.amount,
  });
});

export const allCoupons = TryCatch(async (req, res, next) => {
  let coupons = await Coupon.find({});
  res.status(201).json({ success: true, coupons });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  let coupon = await Coupon.findByIdAndDelete(id);
  if(!coupon){
    return next(new ErrorHandler("Coupon not found",400))
  }
  res
    .status(200)
    .json({ success: true, message: "Coupon deleted successfull" });
});
