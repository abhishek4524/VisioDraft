import React, { useEffect, useState, useRef } from "react";
import { initSocket, getSocket } from "../socket";
import axios from "axios";

export default function CommunityChatComponent({ communityId, user, serverUrl }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    initSocket(serverUrl, token);
    const socket = getSocket();

    // Join community
    socket.emit("joinCommunity", { communityId });

    // Listen for messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    socket.on("systemMessage", (m) => {
      setMessages((prev) => [...prev, { ...m, system: true }]);
      scrollToBottom();
    });

    // Load message history
    const loadMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/api/communities/${communityId}/messages?limit=100`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data || []);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("Could not load messages", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    return () => {
      socket.emit("leaveCommunity", { communityId });
      socket.off("receiveMessage");
      socket.off("systemMessage");
    };
  }, [communityId, serverUrl]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const socket = getSocket();
    socket.emit("sendMessage", { communityId, text });
    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1">
      <div 
        ref={messagesRef} 
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-lg mb-4"
        style={{ maxHeight: '400px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((m) => (
            <div 
              key={m.id || m._id || Math.random()} 
              className={`p-3 rounded-lg ${m.system ? "bg-yellow-100 text-yellow-800 text-sm italic" : "bg-white shadow-sm"}`}
            >
              {!m.system && (
                <div className="text-xs font-medium text-blue-600 mb-1">
                  {m.senderName}
                  {user && m.senderId === user._id && " (You)"}
                </div>
              )}
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={sendMessage} 
          disabled={!text.trim()}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}