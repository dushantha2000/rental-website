import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import { apiUrl } from '../common/Http'; // Ensure this points to your backend URL

const ChatBox = ({ rentals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your real estate assistant. I can help you find the perfect property. What are you looking for today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add the user's message to the chat
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Send the message to the backend using fetch
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }), 
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const data = await response.json();

      // Add the bot's response to the chat
      const botResponse = {
        id: messages.length + 2,
        text: data.response, 
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Handle errors (e.g., network issues or backend errors)
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I couldn't get a response from the server.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Clear the input field
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white shadow-xl rounded-3xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 rounded-t-3xl flex justify-between items-center shadow-md">
            <h3 className="font-semibold text-lg">Real Estate Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white text-purple-600 hover:bg-gray-200 p-2 rounded-full"
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-lg shadow-md ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t flex bg-gray-100 rounded-b-3xl shadow-md">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 text-white px-6 py-2 rounded-r-full hover:bg-purple-700"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700 transition-all animate-bounce"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBox;