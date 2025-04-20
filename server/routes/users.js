const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User profile management
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.get('/roles', userController.getUserRoles);

module.exports = router;