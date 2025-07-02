import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  user_input: String,
  feedback: String,
  tone: String,
  timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
