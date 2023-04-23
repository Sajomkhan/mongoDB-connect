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

// post product data
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

// get product data
app.get('/products', async (req, res) => {
    try {
       const products = await Product.find().limit(10);
       if ( products ) {
        res.status(200).send({
            success : ture,
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
        res.status(500).send({message: error.massage});    
    }
})

// product query
app.get('/products/:id', async (req, res) => {
    try {
       const id = req.params.id;
       const product = await Product.findOne({_id: id});
       if (product) {
        res.status(200).send({
            success : true,
            message : "return single product",
            data : product
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


module.exports = app