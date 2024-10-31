const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { addToCart, deleteCart, getOneCart, getCart, editCart  } = require('../controllers/cart');

routes.post('/cart', verify, addToCart);
routes.get('/cart', verify, getCart);
routes.get('/cart/:id', verify, getOneCart);
routes.put('/cart',verify, editCart);
routes.delete('/cart', verify, deleteCart);

module.exports = routes;