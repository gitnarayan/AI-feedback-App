import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackDisplay from "./components/FeedbackDisplay";
import HistoryList from "./components/HistoryList";

function App() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("concise"); 
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post("/api/feedback", {
        input,       
        tone         
      });
      setFeedback(res.data.feedback);
      setInput("");
      fetchHistory();
    } catch (error) {
      console.error("Error from backend:", error?.response?.data || error.message);
      alert("Something went wrong. Check console.");
    }
  };

  const fetchHistory = async () => {
    const res = await axios.get("/api/history");
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FeedbackForm
        input={input}
        setInput={setInput}
        tone={tone}         // ✅ pass tone state
        setTone={setTone}   // ✅ pass setter for dropdown
        handleSubmit={handleSubmit}
      />

      {feedback && <FeedbackDisplay feedback={feedback} />}
      {history.length > 0 && <HistoryList history={history} />}
    </div>
  );
}

export default App;
