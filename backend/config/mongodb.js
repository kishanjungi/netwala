import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('DB connected');
    });

    const uri = `${process.env.MONGO_URI}/crud`;
    console.log("Connecting to:", uri);  // Debug log

    await mongoose.connect(uri);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
