const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/product');
const transRoutes = require('./routes/transaction');
const cartRoutes = require('./routes/cart');

dotenv.config();

mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('Connected'))
        .catch(() => console.log("error"));


const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(transRoutes);
app.use(cartRoutes);



app.listen(PORT, () => {
                    console.log(`app is running at ${PORT}`)
                })