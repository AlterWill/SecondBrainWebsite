import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting database:", error);
    // process.exit(1); // Optional: Exit if DB fails
  }
}
