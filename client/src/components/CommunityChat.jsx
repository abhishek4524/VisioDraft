import React, { useEffect, useState, useRef, useCallback } from "react";
import { initSocket, getSocket } from "../socket";
import axios from "axios";

export default function CommunityChatComponent({
  communityId,
  user,
  serverUrl,
}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const messagesRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  // Emoji list
  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "🥲",
    "🥹",
    "☺️",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "🥳",
    "🙂‍↕️",
    "😏",
    "😒",
    "🙂‍↔️",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😮‍💨",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🫣",
    "🤗",
    "🫡",
    "🤔",
    "🫢",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😶‍🌫️",
    "😐",
    "😑",
    "😬",
    "🫨",
    "🫠",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🫩",
    "🤤",
    "😪",
    "😵",
    "😵‍💫",
    "🫥",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
  ];

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus input on mount, especially important for mobile
  useEffect(() => {
    if (inputRef.current && !isMobileView) {
      inputRef.current.focus();
    }
  }, [isMobileView]);

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

    // Listen for typing events
    socket.on("userTyping", (data) => {
      if (data.userId !== user._id) {
        setIsTyping(true);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    });

    // Load message history
    const loadMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${serverUrl}/api/communities/${communityId}/messages?limit=100`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data || []);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("Could not load messages", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Close emoji picker when clicking outside
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      socket.emit("leaveCommunity", { communityId });
      socket.off("receiveMessage");
      socket.off("systemMessage");
      socket.off("userTyping");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [communityId, serverUrl, user]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const socket = getSocket();
    socket.emit("sendMessage", { communityId, text });
    setText("");
    // Refocus on input after sending message
    if (inputRef.current && !isMobileView) {
      inputRef.current.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else {
      // Emit typing event
      const socket = getSocket();
      socket.emit("typing", { communityId, userId: user._id });
    }
  };

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  const addEmoji = (emoji) => {
    setText((prevText) => prevText + emoji);
    setShowEmojiPicker(false);
    // Refocus on input after adding emoji
    if (inputRef.current && !isMobileView) {
      inputRef.current.focus();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mb-3"></div>
          <p className="text-gray-600 text-sm">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {" "}
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-2 w-2 md:h-3 md:w-3 bg-green-400 rounded-full absolute -right-0.5 -bottom-0.5 border-2 border-white z-10"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-base shadow-sm">
              {communityId.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="ml-2 md:ml-3">
            <h2 className="font-semibold text-gray-800 text-sm md:text-base">
              Community Chat
            </h2>
            <p className="text-xs text-gray-500">
              {isTyping ? (
                <span className="flex items-center text-purple-600">
                  <span className="animate-pulse">•</span>
                  <span className="ml-1">Someone is typing...</span>
                </span>
              ) : (
                "Online"
              )}
            </p>
          </div>
        </div>
      </div>
      {/* Messages Container */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gray-50"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 md:py-10 px-4">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-inner">
              <svg
                className="w-6 h-6 md:w-10 md:h-10 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 text-xs md:text-sm max-w-xs">
              Be the first to start the conversation!
            </p>
          </div>
        ) : (
          messages.map((m) => {
            const isUserMessage = user && m.senderId === user._id;

            return (
              <div
                key={m.id || m._id || Math.random()}
                className={`flex ${
                  isUserMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] xs:max-w-xs md:max-w-md p-3 rounded-2xl relative group ${
                    m.system
                      ? "bg-yellow-100 border border-yellow-200 text-yellow-800 text-xs italic mx-auto px-3 md:px-4 py-1 md:py-2"
                      : isUserMessage
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  } transition-all duration-200`}
                >
                  {!m.system && !isUserMessage && (
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      {m.senderName}
                    </div>
                  )}
                  <div className="text-sm break-words">{m.text}</div>
                  <div
                    className={`text-xs mt-1 flex ${
                      isUserMessage
                        ? "justify-end text-blue-100"
                        : "justify-start text-gray-500"
                    }`}
                  >
                    {m.createdAt && !isNaN(new Date(m.createdAt).getTime())
                      ? new Date(m.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </div>

                  {/* Message status indicator for user's messages */}
                  {isUserMessage && (
                    <div className="absolute -right-1 -bottom-1 md:-right-1.5 md:-bottom-1.5 bg-white rounded-full p-0.5 shadow-sm">
                      <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-blue-400 flex items-center justify-center">
                        <svg
                          className="h-1.5 w-1.5 md:h-2 md:w-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <path d="M0 0l4 4 4-4z" transform="translate(0 2)" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Input Area */}
      <div className="p-2 md:p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-1 md:gap-2 bg-gray-100 p-1.5 md:p-2 rounded-xl">
          {/* Emoji Picker Button */}
          <button
            className="p-1.5 md:p-2 text-gray-500 hover:text-purple-600 rounded-lg transition-colors"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              // On mobile, close virtual keyboard when opening emoji picker
              if (isMobileView && inputRef.current) {
                inputRef.current.blur();
              }
            }}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message..."
            className="flex-1 border-0 bg-transparent rounded-lg p-1.5 md:p-2 text-sm md:text-base focus:outline-none focus:ring-0"
          />

          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 md:p-3 grid grid-cols-6 md:grid-cols-8 gap-1 max-h-32 md:max-h-40 overflow-y-auto"
          >
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="text-lg md:text-xl p-1 hover:bg-gray-100 rounded"
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
