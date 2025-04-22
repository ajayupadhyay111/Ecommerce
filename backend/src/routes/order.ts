// src/routes/user.ts
import express from "express";
import { adminOnly } from "../middleware/auth.js";
import { newOrder,myOrders, allOrders, getSingleOrder, processOrder, deleteOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/new",newOrder)
router.get("/my",myOrders)
router.get("/all",adminOnly,allOrders)
router.get("/:id",getSingleOrder)
router.put("/:id",adminOnly,processOrder)
router.delete("/:id",deleteOrder)

export default router;
