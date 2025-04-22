import express from 'express'
import userRoutes from './routes/user.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/payment.js'
import adminDashboardRoutes from './routes/adminDashboard.js'
import connectDB from './config/db.js';
import { errorHandler } from './middleware/error.js';
import {config} from 'dotenv'
config({
    path:"./.env"
})

const app = express();

app.use(express.json());

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/order",orderRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/admin_dashboard",adminDashboardRoutes)

app.use(errorHandler)
    
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
