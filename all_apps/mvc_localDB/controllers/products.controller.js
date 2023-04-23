
const Product = require("../models/products_models");

exports.addProducts = async (req, res) => {
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
 }

exports.allProductsGet = async (req, res) => {
    try {
       const products = await Product.find().limit(100);
       if ( products ) {
        res.status(200).send({
            success : true,
            message : "Return all product",
            data : products,
        });    
       } else {
        res.status(404).send({
            success: false,
            message : "Request not found",
        }); 
       }
    } catch (error) {
        res.status(500).send({message: error.message});    
    }
} 


// const path = require('path');
// exports.getProduct = (req, res) => {
//     res.sendFile(path.join(__dirname + "/../views/product_form"))
// }

