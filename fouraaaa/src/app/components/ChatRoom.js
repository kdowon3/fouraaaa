"use client";

import { useState, useEffect } from "react";

export default function ChatRoom({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    setWs(socket);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8000/rooms/${userId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages);
        } else {
          console.error("Failed to load messages:", res.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    return () => {
      socket.close();
    };
  }, [userId]);

  const sendMessage = () => {
    if (ws && input.trim()) {
      const message = {
        content: input,
        sender: userId,
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(message));
      setInput("");
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "5px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
        Send
      </button>
    </div>
  );
}
