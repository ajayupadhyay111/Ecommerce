import express from 'express'
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/adminDashboard.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get("/stats",adminOnly,getDashboardStats)
router.get("/bar",adminOnly,getBarCharts)
router.get("/pie",adminOnly,getPieCharts)
router.get("/line",adminOnly,getLineCharts)

export default router;