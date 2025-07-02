import React from "react";
import '../styles.css';

function HistoryList({ history }) {
  return (
    <div className="history-container">
      <h3 className="history-title">Previous Submissions</h3>
      <div className="history-grid">
        {history.map((item, index) => (
          <div key={index} className="history-card">
            <div className="history-section">
              <span className="history-label input-label">Input</span>
              <p>{item.user_input}</p>
            </div>
            <div className="history-section">
              <span className="history-label feedback-label">Feedback</span>
              <p>{item.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
