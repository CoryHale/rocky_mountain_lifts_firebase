const functions = require('firebase-functions');
const server = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
server.use(cors());

const { db } = require('./util/admin');

const { 
    login, 
    getAuthenticatedUser 
} = require('./handlers/users');

const {
    getAllTasks
} = require('./handlers/tasks');

// user routes
server.post('/login', login);
server.get('/user', FBAuth, getAuthenticatedUser)

// task routes
server.get('/tasks', FBAuth, getAllTasks);

exports.api = functions.https.onRequest(server);