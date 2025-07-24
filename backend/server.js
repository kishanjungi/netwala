import express from "express";
import connectDB from "./config/mongodb.js"; // adjust path
import cors from 'cors';
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 3000;
connectDB(); 
cloudinaryConnect();

// middlewares
app.use(express.json());  
app.use(cors());

// api endpoints
app.use('/api/users',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// routes and other middleware...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
