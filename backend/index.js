const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.js'); // Adjust the path as needed
const connectDB=require('./src//lib/db.js')
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the auth routes
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB(); // Connect to the MongoDB database
});