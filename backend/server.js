import express from "express";
import connectDB from "./config/mongodb.js"; // adjust path
import cors from 'cors';
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import authRoutes from "./routes/authRoute.js"; 

import "./config/googleAuth.js";

import session from "express-session";
import passport from "passport";
// import product from "../frontend/src/pages/Product";


const app = express();
const port = 3000;
connectDB(); 
cloudinaryConnect();

// middlewares
app.use(express.json());  
app.use(cors());



app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET, // should be in .env for production
  resave: false,
  saveUninitialized: false,
}));

// api endpoints
app.use('/api/users',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use("/auth", authRoutes); 
// routes and other middleware...


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
