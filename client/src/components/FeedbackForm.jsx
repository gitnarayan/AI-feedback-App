import React from "react";
import "../styles.css";
import { marked } from 'marked';

function FeedbackForm({ input, setInput, tone, setTone, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <textarea
        className="textarea"
        rows={4}
        placeholder="Your response..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Tone Selector */}
      <select
        className="tone-select"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="concise">Concise</option>
        <option value="detailed">Detailed</option>
        <option value="strict">Strict</option>
        <option value="friendly">Friendly</option>
        <option value="formal">Formal</option>
      </select>

      <button type="submit" className="submit-button">
        Get Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
