const express = require("express");

const connectDB = require('./db/connectDB')
const productRoutes = require('./routes/products_routes')

const app = express();
const port = 3002;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(productRoutes);

// Home route
app.use("/", (req, res) => {
    res.send("<h1>Welcome to home page</h1>");
})

// Error handeling
app.use((req, res) => {
    res.statusCode = 404;
    res.send('Error 404: There is an Error')
})

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
    connectDB()
})

