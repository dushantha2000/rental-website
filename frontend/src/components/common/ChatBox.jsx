import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Loader2, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Debug mode flag
  const DEBUG_MODE = true;

  // Animation variants
  const chatVariants = {
    open: { scale: 1, opacity: 1, y: 0 },
    closed: { scale: 0, opacity: 0, y: 100 },
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        text: "Hello! I'm your real estate assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsBotTyping(true);

    try {
      if (DEBUG_MODE) {
        console.group("Chat API Request");
        console.log("Sending message:", message);
        console.time("API Request Duration");
      }

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message }),
        credentials: "include"
      });

      if (DEBUG_MODE) {
        console.log("Response status:", response.status);
        console.timeEnd("API Request Duration");
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (DEBUG_MODE) {
        console.log("Response data:", data);
        console.groupEnd();
      }

      if (!data || !data.response) {
        throw new Error("Invalid response format from API");
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      if (DEBUG_MODE) {
        console.group("Chat API Error");
        console.error("Error details:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
        console.groupEnd();
      }

      let errorText = "Sorry, I'm having trouble connecting. Please try again.";
      if (error.message.includes("Failed to fetch")) {
        errorText = "Unable to connect to the server. Please check your network connection.";
      } else if (error.message.includes("CORS")) {
        errorText = "Connection blocked due to security settings. Please contact support.";
      } else if (error.message.includes("Invalid response")) {
        errorText = "The server returned an unexpected response. Please try again later.";
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsBotTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat"
            initial="closed"
            animate="open"
            exit="closed"
            variants={chatVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-96 h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-100 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-white" />
                <h3 className="text-lg font-bold">Property Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 transition-colors rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {msg.sender === "bot" && (
                        <Bot size={20} className="flex-shrink-0 mt-1 text-gray-400" />
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white"
                            : "bg-white text-gray-800 shadow-md"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                      {msg.sender === "user" && (
                        <User size={20} className="flex-shrink-0 mt-1 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isBotTyping && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-100 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-200 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-sm">Assistant is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about properties..."
                    className="flex-1 px-4 py-3 transition-all border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="p-3 text-white transition-all shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 hover:shadow-xl"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {["Do you have houses in Colombo?", "Hello", "Can I schedule a visit?", "When can I visit the house?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="px-3 py-2 text-sm text-gray-700 truncate transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-5 text-white transition-all rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 hover:shadow-3xl hover:scale-105"
          >
            <MessageCircle size={32} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;