const functions = require('firebase-functions');
const server = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
server.use(cors());

const { db } = require('./util/admin');

const { login, getAuthenticatedUser } = require('./handlers/users');

// user routes
server.post('/login', login);
server.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(server);
