const express = require('express');
const app = express();
const connectDB = require('./db');
const routes = require('./router');
const hotelroutes = require('./hotelrouter');
const loginroutes = require("./loginrouter");
const createUser= require('./createUser');
const cartRoute = require('./cartRoute');
var orderdata = require('./Orderrouter');

var cors=require('cors');

const corsOptions = {
    origin: 'http://localhost:5000', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};
app.use(cors());

// Connect to the database with error handling
connectDB().then(() => {
    console.log("Database connected successfully");
}).catch(err => {
    console.error("Database connection error:", err);
});

// Route setups
app.use('/foodapp', routes);
app.use('/foodapp/hotels', hotelroutes);
app.use('/foodapp/Signup',createUser);
app.use("/foodapp/userLogin",loginroutes);
app.use("/foodapp/Cart",cartRoute);
app.use("/foodapp/orderdData",orderdata);

// Start the server
app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
