const express = require("express");
const mongoose = require("mongoose");

const port = 3002;

const app = express();
app.use(express.json())
//for form data receiving
app.use(express.urlencoded({extended: true}))

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
const Product = mongoose.model("Products", productSchema);

// connect with DB
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

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
    connectDB()
})

app.get("/", (req, res) => {
    res.send("Welcome to home page");
})

app.post('/products', async (req, res) => {
    try {
     // get data form request body
     const newProduct = new Product({
         title: req.body.title,
         price: req.body.price,
         desc: req.body.desc,
      });
      const productData = await newProduct.save();
 
      res.status(201).send({productData})
 
    } catch (error) {
     res.status(500).send({message: error.massage});    
    }
 })

 // get product data
app.get('/products', async (req, res) => {
    try {
       const products = await Product.find().limit(10);
       if ( products ) {
        res.status(200).send({
            success : true,
            message : "return all product",
            data : products,
        });    
       } else {
        res.status(404).send({
            success: false,
            message : "Product not found",
        }); 
       }
    } catch (error) {
        res.status(500).send({message: error.message});    
    }
})

// Error handeling
app.use((req, res) => {
    res.statusCode = 404;
    res.send('Error 404: There is an Error')
})

