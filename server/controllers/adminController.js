const db = require('../db');
const snowflakeService = require('../services/snowflakeService');

// Dashboard statistics
const getDashboardStats = async (req, res, next) => {
  try {
    // In a production app, these would be real database queries
    const stats = {
      totalVolunteers: 87,
      activeTrainings: 12,
      upcomingEvents: 8,
      hoursLogged: 342
    };
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// Volunteer management
const getAllVolunteers = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM volunteers ORDER BY created_at DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getRecentVolunteers = async (req, res, next) => {
  try {
    // For demo/development, return mock data
    const volunteers = [
      {
        id: 1,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        city: 'Davis',
        state: 'CA',
        training: ['Peer-to-Peer', 'Crisis Support'],
        status: 'active',
        hoursLogged: 28,
        avatarUrl: null
      },
      {
        id: 2,
        name: 'Michael Johnson',
        email: 'michael.j@example.com',
        city: 'Woodland',
        state: 'CA',
        training: ['Family-to-Family'],
        status: 'pending',
        hoursLogged: 0,
        avatarUrl: null
      },
      {
        id: 3,
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        city: 'West Sacramento',
        state: 'CA',
        training: ['Community Outreach', 'Peer-to-Peer'],
        status: 'active',
        hoursLogged: 42,
        avatarUrl: null
      },
      {
        id: 4,
        name: 'David Chen',
        email: 'david.c@example.com',
        city: 'Davis',
        state: 'CA',
        training: ['Crisis Support'],
        status: 'on-leave',
        hoursLogged: 15,
        avatarUrl: null
      },
      {
        id: 5,
        name: 'Emily Rodriguez',
        email: 'emily.r@example.com',
        city: 'Winters',
        state: 'CA',
        training: ['Peer-to-Peer'],
        status: 'pending',
        hoursLogged: 0,
        avatarUrl: null
      }
    ];
    
    res.json(volunteers);
  } catch (error) {
    next(error);
  }
};

const getVolunteerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT * FROM volunteers WHERE id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, city, state, zip, training, status } = req.body;
    
    const result = await db.query(
      `UPDATE volunteers 
       SET name = $1, email = $2, phone = $3, address = $4, city = $5, 
           state = $6, zip = $7, training = $8, status = $9, updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [name, email, phone, address, city, state, zip, training, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const approveVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `UPDATE volunteers 
       SET status = 'active', approved_at = NOW(), updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await db.query(
      `UPDATE volunteers 
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Training management
const getAllTrainings = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM trainings ORDER BY start_date DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createTraining = async (req, res, next) => {
  try {
    const { title, description, category, start_date, end_date, location, max_participants, instructor } = req.body;
    
    const result = await db.query(
      `INSERT INTO trainings 
       (title, description, category, start_date, end_date, location, max_participants, instructor, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [title, description, category, start_date, end_date, location, max_participants, instructor]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getTrainingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT * FROM trainings WHERE id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, start_date, end_date, location, max_participants, instructor, status } = req.body;
    
    const result = await db.query(
      `UPDATE trainings 
       SET title = $1, description = $2, category = $3, start_date = $4, end_date = $5, 
           location = $6, max_participants = $7, instructor = $8, status = $9, updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [title, description, category, start_date, end_date, location, max_participants, instructor, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await db.query(
      `DELETE FROM trainings WHERE id = $1`,
      [id]
    );
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Event management
const getAllEvents = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM events ORDER BY date DESC`
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
        date: "2025-04-25",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        location: "Davis Community Center",
        status: "scheduled",
        requiredVolunteers: 3,
        assignedVolunteers: [
          { id: 1, name: "Jane Smith" },
          { id: 3, name: "Sarah Williams" }
        ]
      },
      {
        id: 2,
        title: "Family-to-Family Workshop",
        date: "2025-04-28",
        startTime: "10:00 AM",
        endTime: "2:00 PM",
        location: "Woodland Library",
        status: "scheduled",
        requiredVolunteers: 4,
        assignedVolunteers: [
          { id: 3, name: "Sarah Williams" }
        ]
      },
      {
        id: 3,
        title: "Mental Health Awareness Presentation",
        date: "2025-05-02",
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        location: "UC Davis Campus",
        status: "scheduled",
        requiredVolunteers: 2,
        assignedVolunteers: []
      }
    ];
    
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { title, description, category, date, startTime, endTime, location, requiredVolunteers } = req.body;
    
    const result = await db.query(
      `INSERT INTO events 
       (title, description, category, date, start_time, end_time, location, required_volunteers, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'scheduled', NOW(), NOW())
       RETURNING *`,
      [title, description, category, date, startTime, endTime, location, requiredVolunteers]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT * FROM events WHERE id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, startTime, endTime, location, requiredVolunteers, status } = req.body;
    
    const result = await db.query(
      `UPDATE events 
       SET title = $1, description = $2, category = $3, date = $4, start_time = $5, 
           end_time = $6, location = $7, required_volunteers = $8, status = $9, updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [title, description, category, date, startTime, endTime, location, requiredVolunteers, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await db.query(
      `DELETE FROM events WHERE id = $1`,
      [id]
    );
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const assignVolunteersToEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { volunteerIds } = req.body;
    
    // First, validate that the event exists
    const eventResult = await db.query(
      `SELECT * FROM events WHERE id = $1`,
      [id]
    );
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the number of volunteers doesn't exceed the required number
    if (volunteerIds.length > eventResult.rows[0].required_volunteers) {
      return res.status(400).json({ 
        message: `Cannot assign more than ${eventResult.rows[0].required_volunteers} volunteers to this event` 
      });
    }
    
    // Start a transaction to ensure data consistency
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Clear existing assignments
      await client.query(
        `DELETE FROM event_volunteers WHERE event_id = $1`,
        [id]
      );
      
      // Add new assignments
      for (const volunteerId of volunteerIds) {
        await client.query(
          `INSERT INTO event_volunteers (event_id, volunteer_id, status, created_at, updated_at)
           VALUES ($1, $2, 'assigned', NOW(), NOW())`,
          [id, volunteerId]
        );
      }
      
      await client.query('COMMIT');
      
      res.json({ message: 'Volunteers assigned successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
};

// Analytics and reports
const getRegionalData = async (req, res, next) => {
  try {
    // For demo/development, return mock data
    const data = [
      { name: 'Davis', volunteers: 45, needs: 30, engagement: 0.8 },
      { name: 'Woodland', volunteers: 32, needs: 40, engagement: 0.6 },
      { name: 'West Sacramento', volunteers: 28, needs: 35, engagement: 0.7 },
      { name: 'Winters', volunteers: 15, needs: 25, engagement: 0.5 },
      { name: 'Other Areas', volunteers: 20, needs: 30, engagement: 0.4 },
    ];
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getVolunteerHoursReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const result = await db.query(
      `SELECT v.name, v.city, SUM(EXTRACT(EPOCH FROM (ev.end_time - ev.start_time))/3600) as hours
       FROM volunteers v
       JOIN event_volunteers ev ON v.id = ev.volunteer_id
       JOIN events e ON e.id = ev.event_id
       WHERE e.date BETWEEN $1 AND $2
       AND ev.status = 'completed'
       GROUP BY v.id, v.name, v.city
       ORDER BY hours DESC`,
      [startDate, endDate]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getTrainingCompletionReport = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT t.title, t.category,
              COUNT(vt.id) as total_enrolled,
              SUM(CASE WHEN vt.status = 'completed' THEN 1 ELSE 0 END) as completed,
              SUM(CASE WHEN vt.status = 'in-progress' THEN 1 ELSE 0 END) as in_progress,
              SUM(CASE WHEN vt.status = 'waitlisted' THEN 1 ELSE 0 END) as waitlisted
       FROM trainings t
       LEFT JOIN volunteer_trainings vt ON t.id = vt.training_id
       GROUP BY t.id, t.title, t.category
       ORDER BY t.start_date DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getFeedbackSummaryReport = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT e.title, e.date, 
              COUNT(f.id) as feedback_count,
              AVG(f.rating) as average_rating,
              json_agg(json_build_object('comment', f.comment, 'rating', f.rating)) as feedback
       FROM events e
       LEFT JOIN feedback f ON e.id = f.event_id
       GROUP BY e.id, e.title, e.date
       ORDER BY e.date DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// RAG with Snowflake API
const processRagQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    
    // Call the Snowflake RAG service
    const response = await snowflakeService.processQuery(query);
    
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllVolunteers,
  getRecentVolunteers,
  getVolunteerById,
  updateVolunteer,
  approveVolunteer,
  updateVolunteerStatus,
  getAllTrainings,
  createTraining,
  getTrainingById,
  updateTraining,
  deleteTraining,
  getAllEvents,
  getUpcomingEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  assignVolunteersToEvent,
  getRegionalData,
  getVolunteerHoursReport,
  getTrainingCompletionReport,
  getFeedbackSummaryReport,
  processRagQuery
};