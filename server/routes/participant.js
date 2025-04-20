const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');
const { checkRole } = require('../middleware/roleCheck');

// All routes in this file require participant role
router.use(checkRole('participant'));

// Event routes
router.get('/events', participantController.getEvents);
router.get('/events/upcoming', participantController.getUpcomingEvents);
router.get('/events/:id', participantController.getEventById);
router.post('/events/:id/register', participantController.registerForEvent);
router.post('/events/:id/cancel', participantController.cancelEventRegistration);
router.post('/events/:id/feedback', participantController.submitEventFeedback);

// Resource routes
router.get('/resources', participantController.getResources);
router.get('/resources/:id', participantController.getResourceById);

// Support routes
router.post('/support/chat', participantController.processSupport);

module.exports = router;