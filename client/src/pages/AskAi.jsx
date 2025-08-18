import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSend, FiUser, FiMessageSquare, FiLoader } from 'react-icons/fi';

const AskAi = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your study assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample knowledge base for demonstration
  const knowledgeBase = {
    'pyqs': 'You can find previous year questions in the PYQs section. They are organized by course, branch, and semester.',
    'notes': 'Study notes are available in the Notes section. You can filter them by subject and semester.',
    'upload': 'You can upload your own notes by going to the Upload Notes page. We accept PDFs and other document formats.',
    'contact': 'For further assistance, please email support@studymate.com or visit our help center.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const query = inputValue.toLowerCase();
      let responseText = "I'm sorry, I couldn't understand your question. Could you please rephrase it?";

      // Check for keywords in the knowledge base
      if (query.includes('pyq') || query.includes('previous year')) {
        responseText = knowledgeBase['pyqs'];
      } else if (query.includes('note') || query.includes('study material')) {
        responseText = knowledgeBase['notes'];
      } else if (query.includes('upload') || query.includes('submit')) {
        responseText = knowledgeBase['upload'];
      } else if (query.includes('contact') || query.includes('help')) {
        responseText = knowledgeBase['contact'];
      }

      const aiMessage = { id: messages.length + 2, text: responseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl my-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Study Assistant AI
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Get instant answers to your academic questions 24/7
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <FiMessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">StudyMate AI Assistant</h2>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3 max-w-xs">
                  <FiLoader className="animate-spin h-5 w-5" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition ${
                  isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiSend className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested questions */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Try asking about:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Where can I find PYQs for CS 3rd sem?",
              "How do I upload my notes?",
              "What study materials are available?",
              "How to contact support?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AskAi;