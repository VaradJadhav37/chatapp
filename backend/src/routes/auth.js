const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authcontroller.js');

// Define routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', updateProfile);
module.exports = router;