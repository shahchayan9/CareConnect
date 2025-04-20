import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simulated AI Service Integration
class AIServices {
  static async analyzeIntent(message) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const intents = ['support', 'crisis', 'event', 'general'];
    return {
      topIntent: intents[Math.floor(Math.random() * intents.length)],
      confidence: 0.7 + Math.random() * 0.3,
      entities: this.extractEntities(message)
    };
  }

  static async analyzeSentiment(message) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      sentiment: Math.random() > 0.7 ? 'negative' : 'neutral',
      urgency: message.toLowerCase().includes('urgent') ? 'high' : 'normal',
      emotionalState: this.detectEmotionalState(message)
    };
  }

  static detectEmotionalState(message) {
    const emotionKeywords = {
      anxious: ['worried', 'anxious', 'nervous', 'scared'],
      distressed: ['help', 'crisis', 'emergency', 'urgent'],
      confused: ['confused', 'unsure', 'don\'t understand', 'what'],
      neutral: []
    };

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return emotion;
      }
    }
    return 'neutral';
  }

  static extractEntities(message) {
    const entities = [];
    const datePattern = /\b(today|tomorrow|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;
    const timePattern = /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\b/i;
    const locationPattern = /\b(office|center|online|zoom)\b/i;

    const dateMatch = message.match(datePattern);
    const timeMatch = message.match(timePattern);
    const locationMatch = message.match(locationPattern);

    if (dateMatch) entities.push({ type: 'date', value: dateMatch[0] });
    if (timeMatch) entities.push({ type: 'time', value: timeMatch[0] });
    if (locationMatch) entities.push({ type: 'location', value: locationMatch[0] });

    return entities;
  }

  static async generateResponse(message, intent, sentiment) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Crisis detection takes priority
    if (sentiment.urgency === 'high' || sentiment.sentiment === 'negative') {
      return QUICK_RESPONSES["I need crisis resources"];
    }

    // Check quick responses first
    if (QUICK_RESPONSES[message]) {
      return {
        ...QUICK_RESPONSES[message],
        metadata: { source: 'quick_responses', confidence: 0.98 }
      };
    }

    // Generate contextual response based on intent and sentiment
    const response = this.generateContextualResponse(intent, sentiment);
    await this.simulateStreamingResponse(response.content);
    return response;
  }

  static generateContextualResponse(intent, sentiment) {
    const baseResponses = {
      support: {
        content: "I understand you're looking for support. Let me help connect you with the right resources:\n\n• For immediate assistance: (555) 123-4567\n• Email: support@namiyolo.org\n• Live chat: Available 9 AM - 5 PM\n\nWould you like me to help you schedule a consultation?",
        actions: [
          { type: 'link', label: 'Schedule Consultation', url: '/participant/support' },
          { type: 'link', label: 'View Resources', url: '/participant/support' }
        ]
      },
      crisis: QUICK_RESPONSES["I need crisis resources"],
      event: QUICK_RESPONSES["How do I register for an event?"],
      general: {
        content: "I can help you with:\n\n• Finding support groups\n• Registering for events\n• Accessing resources\n• Connecting with counselors\n\nWhat would you like to know more about?",
        actions: [
          { type: 'link', label: 'Browse Services', url: '/participant/support' },
          { type: 'link', label: 'Contact Us', url: '/participant/support' }
        ]
      }
    };

    return {
      ...baseResponses[intent],
      metadata: {
        source: 'contextual',
        confidence: 0.85,
        sentiment: sentiment.sentiment,
        emotionalState: sentiment.emotionalState
      }
    };
  }

  static async simulateStreamingResponse(content) {
    // This would normally stream the response, but we'll just simulate the delay
    await new Promise(resolve => setTimeout(resolve, content.length * 10));
  }
}

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

function SupportChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi there! I'm the NAMI Yolo AI Assistant. How can I help you today?",
      sender: "bot"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [processingSteps, setProcessingSteps] = useState([]);

  // Quick questions
  const quickQuestions = Object.keys(QUICK_RESPONSES);

  // Cleanup processing steps
  useEffect(() => {
    const timer = setTimeout(() => {
      if (processingSteps.length > 0 && !isLoading) {
        setProcessingSteps([]);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [processingSteps, isLoading]);

  const addProcessingStep = (step) => {
    setProcessingSteps(prev => [...prev, step]);
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
    setIsAnalyzing(true);
    
    try {
      // Simulate intent analysis
      addProcessingStep("Analyzing message intent...");
      const intentAnalysis = await AIServices.analyzeIntent(newMessage);
      
      // Simulate sentiment analysis
      addProcessingStep("Processing sentiment...");
      const sentimentAnalysis = await AIServices.analyzeSentiment(newMessage);
      
      // Add thinking message for low confidence or negative sentiment
      if (intentAnalysis.confidence < 0.8 || sentimentAnalysis.sentiment === 'negative') {
        setIsTyping(true);
        addProcessingStep("Evaluating response options...");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Generate response
      addProcessingStep("Generating response...");
      const response = await AIServices.generateResponse(
        newMessage,
        intentAnalysis.topIntent,
        sentimentAnalysis
      );
      
      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        content: response.content,
        sender: "bot",
        actions: response.actions,
        metadata: response.metadata
      };
      
      setMessages(prev => prev.filter(m => !m.isThinking).concat(botMessage));
      
      // Add follow-up for negative sentiment
      if (sentimentAnalysis.sentiment === 'negative') {
        setTimeout(() => {
          const followUp = {
            id: messages.length + 3,
            content: "I notice you might be feeling distressed. Would you like me to connect you with a counselor?",
            sender: "bot",
            actions: [
              { type: 'link', label: 'Talk to Someone Now', url: '/participant/support' },
              { type: 'link', label: 'View Resources', url: '/participant/support' }
            ]
          };
          setMessages(prev => [...prev, followUp]);
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        content: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team directly at support@namiyolo.org",
        sender: "bot",
        isError: true,
        actions: [
          { type: 'link', label: 'Email Support', url: 'mailto:support@namiyolo.org' },
          { type: 'link', label: 'Contact Us', url: '/participant/support' }
        ]
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
      setIsTyping(false);
    }
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
                    : message.isThinking
                      ? 'bg-yellow-50 text-yellow-900'
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
        
        {/* Processing steps indicator */}
        {(isAnalyzing || isTyping) && processingSteps.length > 0 && (
          <div className="flex flex-col space-y-1">
            {processingSteps.map((step, index) => (
              <div key={index} className="text-xs text-gray-500 italic">
                {step}
              </div>
            ))}
          </div>
        )}
        
        {/* Typing indicator */}
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
