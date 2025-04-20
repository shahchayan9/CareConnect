import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Hardcoded responses for quick questions
const QUICK_RESPONSES = {
  "When is the next support group?": {
    content: "Our next support group meetings are:\n• Monday, April 15th at 6:00 PM (Online)\n• Wednesday, April 17th at 7:00 PM (Community Center)\n• Saturday, April 20th at 10:00 AM (NAMI Office)",
    actions: [
      { type: 'link', label: 'Register for Online Group', url: '/participant/events' },
      { type: 'link', label: 'View Calendar', url: '/participant/events' }
    ]
  },
  "How do I register for an event?": {
    content: "To register for an event:\n1. Go to the Events page\n2. Find the event you're interested in\n3. Click the 'Register' button\n4. Fill out any required information\n\nNeed help finding an event?",
    actions: [
      { type: 'link', label: 'Browse Events', url: '/participant/events' },
      { type: 'register', label: 'Contact Support', url: '/participant/support' }
    ]
  },
  "I need crisis resources": {
    content: "If you're experiencing a crisis:\n\n• Emergency: Call 911\n• National Crisis Line: 988\n• Local Crisis Line: (555) 555-5555\n\nAdditional Resources:\n• 24/7 Crisis Text Line: Text HOME to 741741\n• Local Emergency Services",
    actions: [
      { type: 'link', label: 'View All Resources', url: '/participant/support' },
      { type: 'link', label: 'Contact Counselor', url: '/participant/support' }
    ]
  },
  "Contact a staff member": {
    content: "Our support team is available:\n\nMonday-Friday: 9 AM - 5 PM\nPhone: (555) 123-4567\nEmail: support@namiyolo.org\n\nFor urgent matters outside business hours, please use our crisis resources.",
    actions: [
      { type: 'link', label: 'Email Support', url: 'mailto:support@namiyolo.org' },
      { type: 'link', label: 'Schedule Call', url: '/participant/support' }
    ]
  }
};

// General responses for non-quick questions
const GENERAL_RESPONSES = [
  {
    content: "I understand you have a question. Let me help connect you with the right resource. Would you like to:",
    actions: [
      { type: 'link', label: 'Browse FAQs', url: '/participant/support' },
      { type: 'link', label: 'Contact Support', url: '/participant/support' }
    ]
  },
  {
    content: "I'm here to help! You can:",
    actions: [
      { type: 'link', label: 'Schedule a Call', url: '/participant/support' },
      { type: 'link', label: 'View Resources', url: '/participant/support' }
    ]
  },
  {
    content: "I'll help you find the information you need. In the meantime, you might find these helpful:",
    actions: [
      { type: 'link', label: 'Support Groups', url: '/participant/events' },
      { type: 'link', label: 'Resource Library', url: '/participant/support' }
    ]
  }
];

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

  // Quick questions
  const quickQuestions = Object.keys(QUICK_RESPONSES);

  const getRandomGeneralResponse = () => {
    const randomIndex = Math.floor(Math.random() * GENERAL_RESPONSES.length);
    return GENERAL_RESPONSES[randomIndex];
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    // Simulate response delay
    setTimeout(() => {
      const response = QUICK_RESPONSES[newMessage] || getRandomGeneralResponse();
      
      const botMessage = {
        id: messages.length + 2,
        content: response.content,
        sender: "bot",
        actions: response.actions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

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
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              
              {/* Action buttons, if any */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    action.type === 'link' ? (
                      <Link
                        key={index}
                        to={action.url}
                        className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50"
                      >
                        {action.label}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          // Handle other action types if needed
                          if (action.type === 'register') {
                            // Handle registration action
                          }
                        }}
                        className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50"
                      >
                        {action.label}
                      </button>
                    )
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
