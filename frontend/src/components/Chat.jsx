import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to your backend Socket.IO server
const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    // Cleanup on unmount
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div className="border p-4 rounded my-4">
      <h2 className="text-xl font-bold mb-2">Live Chat</h2>
      <div className="h-40 overflow-y-scroll border mb-2 p-2">
        {messages.map((msg, index) => (
          <p key={index} className="my-1">{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="border p-2 w-full"
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
