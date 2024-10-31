const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { createTrans, getOnetran, getTrans, updateStatus } = require('../controllers/transaction');

routes.get('/tran/:id', verify, getOnetran );
routes.get('/tran', verify, getTrans);
routes.put('/tran-status', verify, updateStatus);

module.exports = routes;