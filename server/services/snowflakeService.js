const axios = require('axios');
const config = require('../config');

// Helper function to prepare Snowflake API request
const prepareSnowflakeRequest = (query, options = {}) => {
  return {
    url: config.snowflake.endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.snowflake.apiKey}`
    },
    data: {
      query,
      ...options
    }
  };
};

// Process RAG query for admin insights
const processQuery = async (query) => {
  try {
    // Example: Query to find volunteers with specific skills and availability
    if (query.toLowerCase().includes('trained in') && query.toLowerCase().includes('available')) {
      // Extract training type from query
      const trainingMatches = query.match(/trained in ([^?]+)/i);
      const trainingType = trainingMatches ? trainingMatches[1].trim() : null;
      
      // Extract time period from query
      const timeMatches = query.match(/available ([^?]+)/i);
      const timePeriod = timeMatches ? timeMatches[1].trim() : null;
      
      // In a real implementation, this would be a call to Snowflake's API
      // For demonstration, we'll return mock data
      return {
        summary: `Found 3 volunteers trained in ${trainingType || 'requested program'} and available during ${timePeriod || 'requested time'}`,
        volunteers: [
          {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            skills: ['Peer-to-Peer', 'Crisis Support'],
            availability: 'Weekends, Evening'
          },
          {
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            skills: ['Family-to-Family'],
            availability: 'Weekday afternoons'
          },
          {
            name: 'Sarah Williams',
            email: 'sarah.w@example.com',
            skills: ['Community Outreach', 'Peer-to-Peer'],
            availability: 'Flexible schedule'
          }
        ]
      };
    }
    
    // Example: Query about regional engagement
    if (query.toLowerCase().includes('region') || query.toLowerCase().includes('location')) {
      return {
        response: "Davis has the highest volunteer engagement at 80%, while Winters has the lowest at 50%. The region with the largest gap between volunteer availability and community needs is Woodland, which has a 32:40 ratio of volunteers to identified needs."
      };
    }
    
    // Example: Query about feedback
    if (query.toLowerCase().includes('feedback') || query.toLowerCase().includes('satisfaction')) {
      return {
        response: "Based on last month's sessions, the Peer Support Group has the highest satisfaction rating (4.8/5), while the Family Education Workshop has received mixed feedback (3.5/5). The most common positive comments mention supportive atmosphere and knowledgeable volunteers."
      };
    }
    
    // Default response for other queries
    return {
      response: "Based on the available volunteer data, I can help you find volunteers, analyze regional engagement, review feedback, or generate reports. Could you please specify what information you're looking for?"
    };
  } catch (error) {
    console.error('Error processing RAG query:', error);
    throw new Error('Error processing your query. Please try again.');
  }
};

// Process support chat for participants
const processSupportChat = async (message) => {
  try {
    // In a real implementation, this would be a call to Snowflake's API with RAG
    // For demonstration, we'll determine responses based on keywords
    
    // Check for event-related questions
    if (message.toLowerCase().includes('next support group') || 
        message.toLowerCase().includes('upcoming event') ||
        message.toLowerCase().includes('when is the next')) {
      return {
        reply: "The next Peer Support Group is scheduled for Friday, April 25th at 6:00 PM at the Davis Community Center. Would you like to register for this event?",
        needsHumanSupport: false
      };
    }
    
    // Check for registration questions
    if (message.toLowerCase().includes('register') || 
        message.toLowerCase().includes('sign up') ||
        message.toLowerCase().includes('attend')) {
      return {
        reply: "You can register for events through our platform. Simply go to the Events section, find the event you're interested in, and click the Register button. Would you like me to show you the current list of upcoming events?",
        needsHumanSupport: false
      };
    }
    
    // Check for crisis support
    if (message.toLowerCase().includes('crisis') || 
        message.toLowerCase().includes('emergency') ||
        message.toLowerCase().includes('suicidal') ||
        message.toLowerCase().includes('harm')) {
      return {
        reply: "If you're experiencing a mental health crisis or emergency, please call the 988 Suicide & Crisis Lifeline at 988 for immediate support. They're available 24/7. Would you like me to provide more crisis resources?",
        needsHumanSupport: true
      };
    }
    
    // Check for contact requests
    if (message.toLowerCase().includes('talk to someone') || 
        message.toLowerCase().includes('staff member') ||
        message.toLowerCase().includes('contact')) {
      return {
        reply: "I'd be happy to connect you with a staff member. Our support team is available Monday-Friday from 9am-5pm. Would you like me to schedule a call, or do you prefer to send an email?",
        needsHumanSupport: true
      };
    }
    
    // Default response
    return {
      reply: "Thank you for reaching out. I'm here to help with information about NAMI Yolo's events, resources, and support services. How can I assist you today?",
      needsHumanSupport: false
    };
  } catch (error) {
    console.error('Error processing support chat:', error);
    return {
      reply: "I'm sorry, I'm having trouble processing your request right now. Would you like to try again or speak with a support team member?",
      needsHumanSupport: true
    };
  }
};

module.exports = {
  processQuery,
  processSupportChat
};