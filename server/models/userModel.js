const mongoose = require('mongoose')
const userSchema = require('../schema/userSchema')
const userModel = new mongoose.model("User",userSchema)
module.exports = {userModel}