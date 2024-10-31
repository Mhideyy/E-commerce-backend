const express = require('express');
const routes = express.Router();
const { createUser, loginUser, logoutUser, oauthRegister } = require('../controllers/auth');
const verify = require('../middleware/verify');



routes.post('/user', createUser);
routes.post('/oauth-user', oauthRegister);
routes.post('/login', loginUser);
routes.post('/logout', verify, logoutUser);


module.exports = routes;