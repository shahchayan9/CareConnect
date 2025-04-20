const db = require('../db');
const snowflakeService = require('../services/snowflakeService');

// Event management
const getEvents = async (req, res, next) => {
  try {
    const participantId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT e.*, pe.status as registration_status
       FROM events e
       LEFT JOIN participant_events pe ON e.id = pe.event_id AND pe.participant_id = $1
       WHERE e.type = 'public' OR e.type = 'participants'
       ORDER BY e.date DESC`,
      [participantId]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getUpcomingEvents = async (req, res, next) => {
  try {
    // For demo/development, return mock data
    const events = [
      {
        id: 1,
        title: "Peer Support Group",
        description: "Weekly support group for individuals living with mental health conditions.",
        category: "Support Group",
        date: "2025-04-25",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        location: "Davis Community Center",
        registered: true,
        attendeeCount: 12
      },
      {
        id: 2,
        title: "Family-to-Family Workshop",
        description: "Educational program for family members, partners and friends of individuals with mental health conditions.",
        category: "Workshop",
        date: "2025-04-28",
        startTime: "10:00 AM",
        endTime: "2:00 PM",
        location: "Woodland Library",
        registered: false,
        attendeeCount: 8
      },
      {
        id: 5,
        title: "Mindfulness and Mental Health",
        description: "Learn mindfulness techniques to improve mental wellbeing and reduce stress.",
        category: "Presentation",
        date: "2025-05-10",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
        location: "Online (Zoom)",
        registered: false,
        attendeeCount: 15
      }
    ];
    
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const participantId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT e.*, pe.status as registration_status
       FROM events e
       LEFT JOIN participant_events pe ON e.id = pe.event_id AND pe.participant_id = $1
       WHERE e.id = $2 AND (e.type = 'public' OR e.type = 'participants')`,
      [participantId, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const registerForEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const participantId = req.auth.payload.sub;
    
    // Check if already registered
    const checkResult = await db.query(
      `SELECT * FROM participant_events 
       WHERE event_id = $1 AND participant_id = $2`,
      [id, participantId]
    );
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    
    // Check event availability
    const eventResult = await db.query(
      `SELECT * FROM events 
       WHERE id = $1 AND (type = 'public' OR type = 'participants')`,
      [id]
    );
    
    if (eventResult.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found or not available for participants' });
      }
      
      const event = eventResult.rows[0];
      
      // Check if event is full
      if (event.max_participants) {
        const registrationResult = await db.query(
          `SELECT COUNT(*) as registered FROM participant_events WHERE event_id = $1`,
          [id]
        );
        
        const registeredCount = parseInt(registrationResult.rows[0].registered);
        
        if (registeredCount >= event.max_participants) {
          return res.status(400).json({ message: 'Event is already at full capacity' });
        }
      }
      
      // Register the participant
      await db.query(
        `INSERT INTO participant_events
         (participant_id, event_id, status, created_at, updated_at)
         VALUES ($1, $2, 'registered', NOW(), NOW())`,
        [participantId, id]
      );
      
      res.json({
        status: 'registered',
        message: 'Successfully registered for event'
      });
    } catch (error) {
      next(error);
    }
  };
  
  const cancelEventRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const participantId = req.auth.payload.sub;
      
      const result = await db.query(
        `DELETE FROM participant_events
         WHERE event_id = $1 AND participant_id = $2
         RETURNING *`,
        [id, participantId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Event registration not found' });
      }
      
      res.json({
        status: 'cancelled',
        message: 'Event registration cancelled successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  const submitEventFeedback = async (req, res, next) => {
    try {
      const { id } = req.params;
      const participantId = req.auth.payload.sub;
      const { rating, comment } = req.body;
      
      // Check if the participant attended the event
      const checkResult = await db.query(
        `SELECT * FROM participant_events
         WHERE event_id = $1 AND participant_id = $2 AND status = 'attended'`,
        [id, participantId]
      );
      
      if (checkResult.rows.length === 0) {
        return res.status(400).json({ 
          message: 'You cannot submit feedback for an event you did not attend' 
        });
      }
      
      // Submit feedback
      await db.query(
        `INSERT INTO feedback
         (participant_id, event_id, rating, comment, feedback_type, created_at, updated_at)
         VALUES ($1, $2, $3, $4, 'participant', NOW(), NOW())
         ON CONFLICT (participant_id, event_id, feedback_type)
         DO UPDATE SET rating = $3, comment = $4, updated_at = NOW()`,
        [participantId, id, rating, comment]
      );
      
      res.json({
        status: 'submitted',
        message: 'Feedback submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  // Resource management
  const getResources = async (req, res, next) => {
    try {
      // For demo/development, return mock data
      const resources = [
        {
          id: 1,
          title: "NAMI Basics: Mental Health Education",
          category: "Education",
          type: "pdf",
          url: "/resources/nami-basics.pdf"
        },
        {
          id: 2,
          title: "Understanding Depression",
          category: "Health Information",
          type: "article",
          url: "/resources/understanding-depression.html"
        },
        {
          id: 3,
          title: "Coping Strategies for Anxiety",
          category: "Self-Help",
          type: "video",
          url: "/resources/anxiety-coping-video.html"
        },
        {
          id: 4,
          title: "Local Mental Health Services Directory",
          category: "Community Resources",
          type: "pdf",
          url: "/resources/local-services-directory.pdf"
        }
      ];
      
      res.json(resources);
    } catch (error) {
      next(error);
    }
  };
  
  const getResourceById = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const result = await db.query(
        `SELECT * FROM resources WHERE id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };
  
  // Support using Snowflake RAG
  const processSupport = async (req, res, next) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }
      
      // Process the message using Snowflake RAG
      const response = await snowflakeService.processSupportChat(message);
      
      // Add suggested actions based on message content
      const actions = [];
      
      // Check for crisis or emergency keywords
      const crisisKeywords = ['suicide', 'kill myself', 'emergency', 'crisis', 'harm'];
      if (crisisKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        actions.push({
          type: 'emergency',
          label: 'Get Crisis Help',
          url: '/emergency-resources'
        });
      }
      
      // Check for event-related keywords
      const eventKeywords = ['event', 'group', 'meeting', 'workshop', 'session'];
      if (eventKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        actions.push({
          type: 'link',
          label: 'View Upcoming Events',
          url: '/participant/events'
        });
      }
      
      // Check for resource-related keywords
      const resourceKeywords = ['resource', 'information', 'learn', 'read', 'guide'];
      if (resourceKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        actions.push({
          type: 'link',
          label: 'Browse Resources',
          url: '/participant/resources'
        });
      }
      
      // Add contact action for complex queries
      if (response.needsHumanSupport) {
        actions.push({
          type: 'contact',
          label: 'Contact Support Team',
          url: '/participant/contact'
        });
      }
      
      res.json({
        reply: response.reply,
        actions
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getEvents,
    getUpcomingEvents,
    getEventById,
    registerForEvent,
    cancelEventRegistration,
    submitEventFeedback,
    getResources,
    getResourceById,
    processSupport
  };