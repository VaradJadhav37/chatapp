const generateToken = require('../lib/utils.js');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel.js'); // Assuming you have a User model

const signup = async (req, res) => {
    const { username, fullname, email, password } = req.body;
    try {
        // Input validation
        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long');
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).send('Email or username already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username:username,
            fullname:fullname,
            email:email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Generate token and send response
        generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            fullname: newUser.fullname,
            email: newUser.email,
            profilePicture: newUser.profilePicture || null, // Handle optional field
        });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error for debugging
        res.status(500).send('Something went wrong'); // Generic error message for client
    }
};

const login = async(req, res) => {
    const {email,password} =req.body
    try{
        // Find user by email
        const user = await User.findOne({email});
        if(!user) return res.status(401).send('Invalid email or password');
        // Validate password
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(401).send('Invalid email or password');
        // Generate token and send response
        generateToken(user._id, res);
        res.json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            profilePicture: user.profilePicture || null, // Handle optional field
        });
        } catch(error){
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).send('Something went wrong'); // Generic error message for client

    }
    
};

const logout = (req, res) => {
    try {
        // Clear the JWT cookie by setting it to an empty value and maxAge to 0
        res.cookie("jwt", "", { maxAge: 0 });

        // Send a success response
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Error during logout:', error); // Log the error for debugging
        res.status(500).send('Something went wrong'); // Generic error message for client
    }
};

module.exports = { signup, login, logout };