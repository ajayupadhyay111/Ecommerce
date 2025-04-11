// src/routes/user.ts
import express from "express";
import {createUser,getAllUsers,getUser,deleteUser} from "../controllers/user.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/allUsers",adminOnly,getAllUsers)
router.get("/:id",adminOnly,getUser)
router.delete("/:id",adminOnly,deleteUser)
export default router;
