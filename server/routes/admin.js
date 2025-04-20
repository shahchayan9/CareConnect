const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkRole } = require('../middleware/roleCheck');

// All routes in this file require admin role
router.use(checkRole('admin'));

// Dashboard routes
router.get('/dashboard/stats', adminController.getDashboardStats);

// Volunteer management routes
router.get('/volunteers', adminController.getAllVolunteers);
router.get('/volunteers/recent', adminController.getRecentVolunteers);
router.get('/volunteers/:id', adminController.getVolunteerById);
router.put('/volunteers/:id', adminController.updateVolunteer);
router.put('/volunteers/:id/approve', adminController.approveVolunteer);
router.put('/volunteers/:id/status', adminController.updateVolunteerStatus);

// Training management routes
router.get('/trainings', adminController.getAllTrainings);
router.post('/trainings', adminController.createTraining);
router.get('/trainings/:id', adminController.getTrainingById);
router.put('/trainings/:id', adminController.updateTraining);
router.delete('/trainings/:id', adminController.deleteTraining);

// Event management routes
router.get('/events', adminController.getAllEvents);
router.get('/events/upcoming', adminController.getUpcomingEvents);
router.post('/events', adminController.createEvent);
router.get('/events/:id', adminController.getEventById);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);
router.post('/events/:id/assign', adminController.assignVolunteersToEvent);

// Analytics and reports
router.get('/analytics/regional-data', adminController.getRegionalData);
router.get('/reports/volunteer-hours', adminController.getVolunteerHoursReport);
router.get('/reports/training-completion', adminController.getTrainingCompletionReport);
router.get('/reports/feedback-summary', adminController.getFeedbackSummaryReport);

// RAG Query
router.post('/rag-query', adminController.processRagQuery);

module.exports = router;