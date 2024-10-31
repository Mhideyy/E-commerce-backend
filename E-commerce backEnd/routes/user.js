const express = require('express');
const routes = express.Router();
const { updatePassword, updateRole, deleteUser } = require('../controllers/user');
const verify = require('../middleware/verify');

routes.delete('/user', verify, deleteUser);
routes.put('/update-pass', verify, updatePassword);
routes.put('/update-role', verify, updateRole);

module.exports = routes;