const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { getOrder, getOneOrder, createOrder, deleteOrder, updateStatus } = require('../controllers/orders');

routes.get('/order', verify, getOrder);
routes.get('/order/:id', verify, getOneOrder);
routes.post('/order', verify, createOrder);
routes.put('/status', verify, updateStatus);
routes.delete('/order', verify, deleteOrder);

module.exports = routes;