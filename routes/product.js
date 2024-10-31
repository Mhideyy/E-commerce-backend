const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { createProductPost, viewProductPost, viewOneProductPost, updateProductPost, likePost, deleteProductPost, updateStatus, searchPost } = require('../controllers/product');


routes.post('/post', verify, createProductPost);
routes.get('/post', viewProductPost);
routes.get('/post/:id', viewOneProductPost);
// routes.get('/search', searchPost);
routes.put('/post', verify, updateProductPost);
routes.put('/update-status/:id', verify, updateStatus);
routes.post('/like-post', verify, likePost);
routes.delete('/post', verify, deleteProductPost);

module.exports = routes;