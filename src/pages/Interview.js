import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Interview.css";

function Interview() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Load history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://ai-interview-agent-mj4f.onrender.com/interview");

        const history = res.data.flatMap((item) => [
          { text: item.question, sender: "user" },
          { text: item.answer, sender: "ai" },
        ]);

        setMessages(history);
      } catch (err) {
        console.log("Error loading history");
      }
    };

    fetchHistory();
  }, []);

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { text: input, sender: "user" },
      { text: "Thinking...", sender: "ai" },
    ];

    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("https://ai-interview-agent-mj4f.onrender.com/interview", {
        message: input,
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: res.data.reply, sender: "ai" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Error getting response", sender: "ai" },
      ]);
    }
  };

  return (
    <div className="main-container">

      {/* 🔵 AI CORE (TOP CENTER) */}
      <div className="ai-core">
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
        <div className="center-glow"></div>
      </div>

      {/* 💎 CHAT CARD */}
      <div className="container">
        <h2 className="title">AI Interview Assistant</h2>

        {/* 💬 CHAT */}
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={msg.sender}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* ✨ INPUT */}
        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your interview question..."
          />

          <button onClick={sendMessage}>🚀</button>
        </div>
      </div>
    </div>
  );
}

export default Interview;