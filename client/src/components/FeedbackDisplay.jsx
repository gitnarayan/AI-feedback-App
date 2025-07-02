import React from "react";
import '../styles.css';

function FeedbackDisplay({ feedback }) {
  return (
    <div className="feedback-display">
      <h3 className="feedback-title">AI Feedback:</h3>
      <p>{feedback}</p>
    </div>
  );
}

export default FeedbackDisplay;
