const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    avatar: {
        type: String,
        default: function() {
            return `https://gravatar.com/avatar/${Math.random() * 10000000}?d=identicon`; // Use a function for default value to ensure dynamic behavior
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

module.exports = userSchema
