const mongoose = require("mongoose");

// creat product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    desc: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// create product model
module.exports = mongoose.model("Products", productSchema);