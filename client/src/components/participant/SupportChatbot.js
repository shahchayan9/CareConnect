import React, { useState } from 'react';
import api from '../../services/api';

function SupportChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi there! How can I help you today?",
      sender: "bot"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user"
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Call Snowflake API via our backend
      const response = await api.post('/participant/support/chat', {
        message: newMessage
      });
      
      // Add bot response to chat
      const botMessage = {
        id: messages.length + 2,
        content: response.data.reply,
        sender: "bot",
        actions: response.data.actions || []
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        content: "Sorry, I'm having trouble connecting. Please try again or contact a support team member directly.",
        sender: "bot",
        isError: true
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample quick questions
  const quickQuestions = [
    "When is the next support group?",
    "How do I register for an event?",
    "I need crisis resources",
    "Contact a staff member"
  ];

  return (
    <div className="flex flex-col h-96">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-100 text-blue-900' 
                  : message.isError 
                    ? 'bg-red-50 text-red-900' 
                    : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              
              {/* Action buttons, if any */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (action.type === 'link') {
                          window.open(action.url, '_blank');
                        } else if (action.type === 'register') {
                          // Handle registration action
                        }
                      }}
                      className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick questions */}
      <div className="px-3 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setNewMessage(question);
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      {/* Message input */}
      <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default SupportChatbot;
