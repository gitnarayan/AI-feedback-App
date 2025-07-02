import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import feedbackRoutes from "./routes/feedback.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", feedbackRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
