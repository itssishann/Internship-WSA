require("dotenv").config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const setTokenCookie = (res, payload) => {
    const maxAgeInDays = 30; // 30 days
    const maxAgeInMilliseconds = maxAgeInDays * 24 * 60 * 60 * 1000;
    res.cookie('token', payload, {
        httpOnly: true,
        maxAge: maxAgeInMilliseconds,
        secure: process.env.NODE_ENV === 'production' // Set secure flag based on environment
    });
};

const generateTokenAndSetCookie = (res, payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    setTokenCookie(res, token);
};

module.exports = {
    generateTokenAndSetCookie
};
