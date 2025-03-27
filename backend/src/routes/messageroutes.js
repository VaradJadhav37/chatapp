const express=require('express');
const protectRoute = require('../middleware/authmiddleware');
const router = express.Router();
const{ getUsersForSidebar,getMessages,sendMessages}=require('../controllers/messagecontroller');
router.get('/users',protectRoute,getUsersForSidebar);
router.get('/:id',protectRoute,getMessages);
router.post('/send/:id',protectRoute,sendMessages);

module.exports = router;