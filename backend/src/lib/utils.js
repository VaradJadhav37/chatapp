const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie with token
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development', // Ensure cookies are only sent over HTTPS in production
    });

    return token;
};

module.exports = generateToken;