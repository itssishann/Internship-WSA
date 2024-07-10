require("dotenv").config()
const mongoose = require("mongoose")
const mongoUrl = process.env.MONGO_URL;
async function connectDB(){
    try {
        await mongoose.connect(mongoUrl)
        console.log("DB Connected!!");
    } catch (error) {
        console.log(`DB Failure! -> ${error.message}`);
    }
}
module.exports = connectDB