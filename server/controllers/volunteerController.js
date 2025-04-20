const db = require('../db');

// Dashboard statistics
const getDashboardStats = async (req, res, next) => {
  try {
    // Get the volunteer ID from the authenticated user
    const volunteerId = req.auth.payload.sub;
    
    // For demo/development, return mock data
    const stats = {
      hoursLogged: 28,
      eventsAttended: 12,
      trainingsCompleted: 3,
      nextEvent: {
        id: 1,
        title: "Peer Support Group",
        date: "2025-04-25",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        location: "Davis Community Center"
      }
    };
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// Training management
const getTrainings = async (req, res, next) => {
  try {
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT t.*, vt.status, vt.progress, vt.completion_date
       FROM trainings t
       LEFT JOIN volunteer_trainings vt ON t.id = vt.training_id AND vt.volunteer_id = $1
       ORDER BY t.start_date DESC`,
      [volunteerId]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getUpcomingTrainings = async (req, res, next) => {
  try {
    // For demo/development, return mock data
    const trainings = [
      {
        id: 1,
        title: "Crisis Intervention Advanced",
        date: "2025-04-30",
        startTime: "5:00 PM",
        endTime: "8:00 PM",
        location: "NAMI Yolo Office",
        status: "confirmed"
      },
      {
        id: 2,
        title: "Peer Support Refresher",
        date: "2025-05-15",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Online (Zoom)",
        status: "pending"
      }
    ];
    
    res.json(trainings);
  } catch (error) {
    next(error);
  }
};

const getTrainingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT t.*, vt.status, vt.progress, vt.completion_date
       FROM trainings t
       LEFT JOIN volunteer_trainings vt ON t.id = vt.training_id AND vt.volunteer_id = $1
       WHERE t.id = $2`,
      [volunteerId, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const enrollInTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    // Check if already enrolled
    const checkResult = await db.query(
      `SELECT * FROM volunteer_trainings 
       WHERE training_id = $1 AND volunteer_id = $2`,
      [id, volunteerId]
    );
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this training' });
    }
    
    // Check training availability
    const trainingResult = await db.query(
      `SELECT * FROM trainings WHERE id = $1`,
      [id]
    );
    
    if (trainingResult.rows.length === 0) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    const training = trainingResult.rows[0];
    
    // Check if training has spots available
    const enrollmentResult = await db.query(
      `SELECT COUNT(*) as enrolled FROM volunteer_trainings WHERE training_id = $1`,
      [id]
    );
    
    const enrolledCount = parseInt(enrollmentResult.rows[0].enrolled);
    
    if (enrolledCount >= training.max_participants) {
      // Waitlist the volunteer
      await db.query(
        `INSERT INTO volunteer_trainings
         (volunteer_id, training_id, status, progress, created_at, updated_at)
         VALUES ($1, $2, 'waitlisted', 0, NOW(), NOW())`,
        [volunteerId, id]
      );
      
      return res.json({ 
        status: 'waitlisted',
        message: 'Training is full. You have been added to the waitlist.' 
      });
    }
    
    // Enroll the volunteer
    await db.query(
      `INSERT INTO volunteer_trainings
       (volunteer_id, training_id, status, progress, created_at, updated_at)
       VALUES ($1, $2, 'in-progress', 0, NOW(), NOW())`,
      [volunteerId, id]
    );
    
    res.json({ 
      status: 'enrolled',
      message: 'Successfully enrolled in training' 
    });
  } catch (error) {
    next(error);
  }
};

const completeTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    // Update the training status to completed
    const result = await db.query(
      `UPDATE volunteer_trainings
       SET status = 'completed', progress = 100, completion_date = NOW(), updated_at = NOW()
       WHERE training_id = $1 AND volunteer_id = $2
       RETURNING *`,
      [id, volunteerId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Training enrollment not found' });
    }
    
    res.json({
      status: 'completed',
      message: 'Training marked as completed',
      completionDate: result.rows[0].completion_date
    });
  } catch (error) {
    next(error);
  }
};

const getTrainingCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    // Check if the volunteer completed the training
    const result = await db.query(
      `SELECT vt.*, t.title, v.name
       FROM volunteer_trainings vt
       JOIN trainings t ON vt.training_id = t.id
       JOIN volunteers v ON vt.volunteer_id = v.id
       WHERE vt.training_id = $1 AND vt.volunteer_id = $2 AND vt.status = 'completed'`,
      [id, volunteerId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Completed training not found' });
    }
    
    // In a real application, generate a PDF certificate here
    // For this demo, return JSON data
    const certificateData = {
      id: result.rows[0].id,
      trainingTitle: result.rows[0].title,
      volunteerName: result.rows[0].name,
      completionDate: result.rows[0].completion_date,
      certificateUrl: `/certificates/${result.rows[0].id}.pdf`
    };
    
    res.json(certificateData);
  } catch (error) {
    next(error);
  }
};

// Event management
const getEvents = async (req, res, next) => {
  try {
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT e.*, ev.status as signup_status
       FROM events e
       LEFT JOIN event_volunteers ev ON e.id = ev.event_id AND ev.volunteer_id = $1
       ORDER BY e.date DESC`,
      [volunteerId]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getAvailableEvents = async (req, res, next) => {
  try {
    // For demo/development, return mock data
    const events = [
      {
        id: 3,
        title: "Mental Health Awareness Presentation",
        date: "2025-05-02",
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        location: "UC Davis Campus",
        volunteersNeeded: 2
      },
      {
        id: 4,
        title: "Community Mental Health Fair",
        date: "2025-05-15",
        startTime: "10:00 AM",
        endTime: "4:00 PM",
        location: "Central Park, Davis",
        volunteersNeeded: 5
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
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT e.*, ev.status as signup_status, ev.role as volunteer_role
       FROM events e
       LEFT JOIN event_volunteers ev ON e.id = ev.event_id AND ev.volunteer_id = $1
       WHERE e.id = $2`,
      [volunteerId, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const signupForEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    const { role } = req.body;
    
    // Check if already signed up
    const checkResult = await db.query(
      `SELECT * FROM event_volunteers 
       WHERE event_id = $1 AND volunteer_id = $2`,
      [id, volunteerId]
    );
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Already signed up for this event' });
    }
    
    // Check event availability
    const eventResult = await db.query(
      `SELECT * FROM events WHERE id = $1`,
      [id]
    );
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if event has spots available
    const signupResult = await db.query(
      `SELECT COUNT(*) as signed_up FROM event_volunteers WHERE event_id = $1`,
      [id]
    );
    
    const signedUpCount = parseInt(signupResult.rows[0].signed_up);
    const requiredVolunteers = eventResult.rows[0].required_volunteers;
    
    if (signedUpCount >= requiredVolunteers) {
      return res.status(400).json({ message: 'Event is already fully staffed' });
    }
    
    // Sign up the volunteer
    await db.query(
      `INSERT INTO event_volunteers
       (volunteer_id, event_id, role, status, created_at, updated_at)
       VALUES ($1, $2, $3, 'signed_up', NOW(), NOW())`,
      [volunteerId, id, role || 'general']
    );
    
    res.json({
      status: 'signed_up',
      message: 'Successfully signed up for event'
    });
  } catch (error) {
    next(error);
  }
};

const cancelEventSignup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `DELETE FROM event_volunteers
       WHERE event_id = $1 AND volunteer_id = $2
       RETURNING *`,
      [id, volunteerId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event signup not found' });
    }
    
    res.json({
      status: 'cancelled',
      message: 'Event signup cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

const checkInToEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `UPDATE event_volunteers
       SET status = 'checked_in', check_in_time = NOW(), updated_at = NOW()
       WHERE event_id = $1 AND volunteer_id = $2
       RETURNING *`,
      [id, volunteerId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event signup not found' });
    }
    
    res.json({
      status: 'checked_in',
      message: 'Successfully checked in to event',
      checkInTime: result.rows[0].check_in_time
    });
  } catch (error) {
    next(error);
  }
};

const submitEventFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const volunteerId = req.auth.payload.sub;
    const { rating, comment } = req.body;
    
    // Check if the volunteer participated in the event
    const checkResult = await db.query(
      `SELECT * FROM event_volunteers
       WHERE event_id = $1 AND volunteer_id = $2`,
      [id, volunteerId]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(400).json({ message: 'You did not participate in this event' });
    }
    
    // Submit feedback
    await db.query(
      `INSERT INTO feedback
       (volunteer_id, event_id, rating, comment, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       ON CONFLICT (volunteer_id, event_id)
       DO UPDATE SET rating = $3, comment = $4, updated_at = NOW()`,
      [volunteerId, id, rating, comment]
    );
    
    res.json({
      status: 'submitted',
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Availability management
const getAvailability = async (req, res, next) => {
  try {
    const volunteerId = req.auth.payload.sub;
    
    const result = await db.query(
      `SELECT * FROM volunteer_availability
       WHERE volunteer_id = $1
       ORDER BY day_of_week, start_time`,
      [volunteerId]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const updateAvailability = async (req, res, next) => {
  try {
    const volunteerId = req.auth.payload.sub;
    const { availability } = req.body;
    
    // Start a transaction
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Delete existing availability
      await client.query(
        `DELETE FROM volunteer_availability WHERE volunteer_id = $1`,
        [volunteerId]
      );
      
      // Insert new availability records
      for (const slot of availability) {
        await client.query(
          `INSERT INTO volunteer_availability
           (volunteer_id, day_of_week, start_time, end_time, created_at, updated_at)
           VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [volunteerId, slot.dayOfWeek, slot.startTime, slot.endTime]
        );
      }
      
      await client.query('COMMIT');
      
      res.json({
        status: 'updated',
        message: 'Availability updated successfully'
      });
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

module.exports = {
  getDashboardStats,
  getTrainings,
  getUpcomingTrainings,
  getTrainingById,
  enrollInTraining,
  completeTraining,
  getTrainingCertificate,
  getEvents,
  getAvailableEvents,
  getEventById,
  signupForEvent,
  cancelEventSignup,
  checkInToEvent,
  submitEventFeedback,
  getAvailability,
  updateAvailability
};