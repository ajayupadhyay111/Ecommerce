// src/routes/user.ts
import express from "express";
import { adminOnly } from "../middleware/auth.js";
import {
  allCoupons,
  deleteCoupon,
  discount,
  newCoupon,
} from "../controllers/payment.js";

const router = express.Router();

router.post("/coupon/new", adminOnly, newCoupon);
router.post("/discount", discount);
router.get("/coupon/all", adminOnly, allCoupons);
router.delete("/coupon/:id", adminOnly, deleteCoupon);
export default router;
