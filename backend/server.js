import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";

import * as Sentry from "@sentry/node";
import { initSentry } from "./utils/sentry.js";

import connectDB from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import "./config/googleAuth.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import authRoutes from "./routes/authRoute.js";
import alluserRoute from "./routes/alluserRoute.js";

import logger from "./utils/logger.js";
import morganStream from "./utils/morganStream.js";
import requestId from "./middleware/requestId.js";

const app = express();
const port = 3000;

/* ======================
   DATABASE
====================== */
connectDB();
cloudinaryConnect();

/* ======================
   SENTRY INIT (FIRST)
====================== */
initSentry(app);

/* ======================
   CORE MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   LOGGING
====================== */
app.use(requestId);
app.use(morgan("combined", { stream: morganStream }));

/* ======================
   SESSION & PASSPORT
====================== */
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/* ======================
   ROUTES
====================== */
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/auth", authRoutes);
app.use("/api/alluser", alluserRoute);

/* ======================
   SENTRY TEST
====================== */
app.get("/debug-sentry", () => {
  throw new Error("Sentry test error");
});

/* ======================
   SENTRY ERROR HANDLER (NEW API)
====================== */
app.use(Sentry.expressErrorHandler());

/* ======================
   FALLBACK ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    requestId: req.requestId,
  });

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

/* ======================
   SERVER START
====================== */
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
