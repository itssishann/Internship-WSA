const jwt = require('jsonwebtoken');

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; 
        // console.log(req.user);
        next();
    });
};
module.exports={
    authMiddleware
}