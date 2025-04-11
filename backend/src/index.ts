import express from 'express'
import userRoutes from './routes/user.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/order.js'
import connectDB from './config/db.js';
import { errorHandler } from './middleware/error.js';
import NodeCache from 'node-cache';
import {config} from 'dotenv'
config({
    path:"./.env"
})

export const myCache = new NodeCache();

const app = express();

app.use(express.json());

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/order",orderRoutes)

app.use(errorHandler)
    
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
