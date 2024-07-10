const bcrypt = require('bcrypt');
require("dotenv").config()
const { z } = require("zod");
const { userModel } = require('../models/userModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { generateTokenAndSetCookie } = require('../utils/setCookie');
dotenv.config();

// Signup route handler
const signup = async (req, res) => {
    // Validate the request body using Zod 
    const userSchema = z.object({
        name: z.string().min(1),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        email: z.string().email("Invalid email format").min(1, "Email is required"),
        avatar: z.string().optional().default(`https://gravatar.com/avatar/${Math.random() * 10000000}?d=identicon`),
        phoneNumber: z.string().min(10),
        active: z.boolean().default(true)
    });
    

    const body = req.body;
    const result = userSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.errors
        });
    }

    try {
        const { name, password, email, avatar, phoneNumber, active } = result.data;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "Email address already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new userModel({
            name,
            password: hashedPassword,
            email,
            avatar,
            phoneNumber,
            active
        });

        // Save the new user to the database
        await newUser.save();
        
        // Create JWT token and send in cookie
        const userId = newUser._id;
        generateTokenAndSetCookie(res, userId);

        res.status(201).json({
            message: "The user account has been successfully created",
            userid: newUser._id
            
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};
const userLogin = async(req, res)=>{
    const loginSchema = z.object({
        email:z.string().email("Invalid email format").min(1, "Email is required"),
        password: z.string().min(6, "Password is required!"),
    })
    const result = loginSchema.safeParse(req.body)
    //send error if login validation fails
    if (!result.success) {
        return res.status(400).json({
            error: result.error.errors
        });
    }
    try {
        const {email,password} = result.data
        const userExists = await userModel.findOne({email})
        if(!userExists) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const hashedPass = await userExists.password
        const isValidPassword = await bcrypt.compare(password,hashedPass)
        if(!isValidPassword) {
            return res.status(401).json({
                message: "Wrong password!"
            });
        }
        const payload = {
            id: userExists._id,
            userName: userExists.name
        }
        generateTokenAndSetCookie(res,payload)
        res.json({
            message: "Logged in successfully",
            // userId: userExists._id
            
        })
    } catch (error) {
        res.status(401).json({
            message:"Invalid credentials!"
        })
    }
}
const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out' });
    }
};


module.exports = {
    signup,
    userLogin,
    userLogout
};
