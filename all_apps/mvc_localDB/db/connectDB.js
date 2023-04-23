const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/productDB')
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
        console.log(error.massage);
        process.exit(1)        
    }
}

module.exports = connectDB;