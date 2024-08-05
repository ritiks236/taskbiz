import mongoose from "mongoose";
import endpoint from "../../endpoint.config";

const dburl = endpoint.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
