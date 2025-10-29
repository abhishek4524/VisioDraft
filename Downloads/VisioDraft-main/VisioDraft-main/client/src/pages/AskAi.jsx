import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { backendUrl } from "../App";
import { FiSend, FiUser, FiMessageSquare, FiLoader, FiBook, FiHelpCircle, FiFileText, FiSearch } from 'react-icons/fi';

const AskAi = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your study assistant. How can I help you with your studies today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sample responses for different query types
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Study material queries
    if (lowerMessage.includes('pyq') || lowerMessage.includes('previous year')) {
      return "You can find previous year question papers in the 'Resources' section. They're organized by semester and subject. For CS 3rd sem, look under Computer Science > Semester 3 > Exam Papers.";
    }
    
    if (lowerMessage.includes('note') || lowerMessage.includes('material')) {
      return "Study materials are available for all major subjects. You can browse by department, semester, or use the search function. To upload your own notes, go to your dashboard and click 'Upload Notes'.";
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('reference')) {
      return "The recommended books section has curated reading lists for each course. Many are available as e-books through our library partnership. Check the 'Books' tab in your subject page.";
    }
    
    // Technical queries
    if (lowerMessage.includes('algorithm') || lowerMessage.includes('programming')) {
      return "For algorithm questions, I recommend breaking down the problem into smaller steps. Would you like me to explain a specific algorithm or help with pseudocode?";
    }
    
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus')) {
      return "Math concepts can be challenging! I can explain concepts step-by-step or direct you to practice problems. What specific topic are you struggling with?";
    }
    
    // General queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return "You can contact support through the 'Help' section in your account. Our team typically responds within 24 hours. For urgent issues, use the live chat during business hours (9AM-5PM).";
    }
    
    if (lowerMessage.includes('upload')) {
      return "To upload documents: 1) Go to your Dashboard 2) Click 'Add Content' 3) Select file type 4) Choose your file 5) Add relevant tags 6) Submit for review. Files are typically approved within 48 hours.";
    }
    
    // Default responses
    const defaultResponses = [
      "I'd be happy to help with that. Could you provide more details about what you're looking for?",
      "That's an interesting question. Let me think about the best way to assist you with that topic.",
      "I have information on that subject. Would you like a general overview or specific details?",
      "I can help explain that concept. What aspect are you finding most challenging?",
      "There are several resources available for that. Would you prefer video explanations, text materials, or practice problems?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!inputValue.trim() || isLoading) return;

  const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsLoading(true);

  try {
    const response = await fetch(`${backendUrl}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });

    const data = await response.json();
    const aiMessage = {
      id: Date.now() + 1,
      text: data.reply,
      sender: 'ai',
    };

    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    const aiMessage = {
      id: Date.now() + 1,
      text: "Sorry, I couldn’t connect to the server.",
      sender: 'ai',
    };
    setMessages(prev => [...prev, aiMessage]);
  } finally {
    setIsLoading(false);
  }
};


  // Suggested questions with categories
  const suggestedQuestions = [
    {
      category: "Study Materials",
      questions: [
        "Where can I find PYQs for CS 3rd sem?",
        "How do I upload my notes?",
        "What study materials are available for electrical engineering?"
      ]
    },
    {
      category: "Technical Help",
      questions: [
        "Explain binary search algorithm",
        "Help with calculus integration problems",
        "What are the best resources to learn programming?"
      ]
    },
    {
      category: "General",
      questions: [
        "How to contact support?",
        "What are the subscription plans?",
        "How to reset my password?"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 max-w-4xl my-20">
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
                <p className="text-xs opacity-80">Online • Ready to help</p>
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
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3 max-w-xs flex items-center">
                  <FiLoader className="animate-spin h-5 w-5 mr-2" />
                  Thinking...
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
                placeholder="Ask about study materials, concepts, or help..."
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

        {/* Suggested questions with categories */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 text-center">
            Try asking about:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedQuestions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    {categoryIndex === 0 ? <FiBook className="h-4 w-4" /> : 
                     categoryIndex === 1 ? <FiHelpCircle className="h-4 w-4" /> : 
                     <FiFileText className="h-4 w-4" />}
                  </div>
                  <h4 className="font-medium text-gray-700">{category.category}</h4>
                </div>
                
                <div className="space-y-2">
                  {category.questions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="text-left w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 transition flex items-start"
                    >
                      <FiSearch className="h-3 w-3 mt-1 mr-2 text-blue-500 flex-shrink-0" />
                      <span>{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AskAi;