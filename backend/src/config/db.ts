import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dburl: string = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
