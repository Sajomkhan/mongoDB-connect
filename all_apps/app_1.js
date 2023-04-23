const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
//for form data receiving
app.use(express.urlencoded({extented: true}))

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

// DB connect
const connectDB =  async() =>{
   try {
     await mongoose.connect('mongodb://127.0.0.1:27017/test')
     console.log("db is conntcted");
   } catch (error) {
    console.log("db is not connected");
    console.log(error.massage);
    process.exit(1);
   }
}
// Listener
app.listen(3000, async () => {
    console.log(`Server is running at http://localhost:3000`);
    await connectDB();
})

// Home
app.get('/', (req, res) => {
    res.statusCode = 200
    res.send('Welcome to home page')
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
    res.status(500).send({message: error.message});    
   }
})
// Error handeling
app.get((req, res) => {
    res.statusCode = 404;
    res.send('Error 404: There is an Error')
})

module.exports = app