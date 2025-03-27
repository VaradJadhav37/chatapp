const express = require('express');
const router = express.Router();
const { signup, login, logout ,updateProfile,checkAuth} = require('../controllers/authcontroller.js');
const protectRoute= require('../middleware/authmiddleware.js');

// Define routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile',protectRoute, updateProfile);
router.get('/check',protectRoute,checkAuth);
module.exports = router;