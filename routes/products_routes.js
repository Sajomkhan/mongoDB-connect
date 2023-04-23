const express = require("express");
const { addProducts, allProductsGet, getProduct } = require("../controllers/products.controller");
const router = express.Router();


router.post('/products', addProducts)

router.get('/products', allProductsGet)


module.exports = router;