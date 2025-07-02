#  AI-Powered Feedback App

A full-stack web application that accepts a user response and returns AI-generated feedback using the OpenAI API. It also saves feedback history using MongoDB.

---

##  Tech Stack

- **Frontend**: React.js (Vite), Axios, Custom CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Optional but included)  
- **AI API**: OpenAI Chat Completions (gpt-3.5-turbo)

---

##  Project Structure


feedback-app/
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
│ │ │ ├── FeedbackForm.jsx
│ │ │ ├── FeedbackDisplay.jsx
│ │ │ └── HistoryList.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── vite.config.js
│
├── server/ # Backend (Express)
│ ├── routes/
│ │ └── feedback.js
│ ├── models/
│ │ └── Feedback.js
│ ├── server.js
│ ├── .env.example
│ └── test-openai.js # (For testing OpenAI API manually)

