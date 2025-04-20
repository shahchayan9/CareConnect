const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const { checkRole } = require('../middleware/roleCheck');

// All routes in this file require volunteer role
router.use(checkRole('volunteer'));

// Dashboard routes
router.get('/dashboard/stats', volunteerController.getDashboardStats);

// Training routes
router.get('/trainings', volunteerController.getTrainings);
router.get('/trainings/upcoming', volunteerController.getUpcomingTrainings);
router.get('/trainings/:id', volunteerController.getTrainingById);
router.post('/trainings/:id/enroll', volunteerController.enrollInTraining);
router.post('/trainings/:id/complete', volunteerController.completeTraining);
router.get('/trainings/:id/certificate', volunteerController.getTrainingCertificate);

// Event routes
router.get('/events', volunteerController.getEvents);
router.get('/events/available', volunteerController.getAvailableEvents);
router.get('/events/:id', volunteerController.getEventById);
router.post('/events/:id/signup', volunteerController.signupForEvent);
router.post('/events/:id/cancel', volunteerController.cancelEventSignup);
router.post('/events/:id/check-in', volunteerController.checkInToEvent);
router.post('/events/:id/feedback', volunteerController.submitEventFeedback);

// Availability management
router.get('/availability', volunteerController.getAvailability);
router.post('/availability', volunteerController.updateAvailability);

module.exports = router;