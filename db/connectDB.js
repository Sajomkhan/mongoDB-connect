require('dotenv').config()
const mongoose = require("mongoose");

const DB = process.env.MONGO_DB_URI

const connectDB = async() => {
    try {
        await mongoose.connect(DB)
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
        console.log(error.massage);
        process.exit(1)        
    }
}

module.exports = connectDB;