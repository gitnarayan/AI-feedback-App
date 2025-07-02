import express from "express";
import { getFeedback, getHistory } from "../controllers/feedbackcontroller.js";

const router = express.Router();

router.post("/feedback", getFeedback);
router.get("/history", getHistory);

export default router; 
