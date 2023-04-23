require("dotenv").config();
const connectDB = require("./db/connectDB");
const Product = require("./models/products_models");

const ProductsJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URI);
    await Product.create(ProductsJson);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

start();
