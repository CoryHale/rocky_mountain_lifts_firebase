const functions = require('firebase-functions');
const server = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
server.use(cors());

const { db } = require('./util/admin');

const { 
    registerEmployee,
    login, 
    getAuthenticatedUser,
    getAllEmployees,
    getAllCustomers,
    editEmployee,
    changeEmployeeStatus
} = require('./handlers/users');

const {
    getAllTasks
} = require('./handlers/tasks');

// user routes
server.post('/e_register', FBAuth, registerEmployee);
server.post('/login', login);
server.get('/user', FBAuth, getAuthenticatedUser);
server.get('/employees', FBAuth, getAllEmployees);
server.get('/customers', FBAuth, getAllCustomers);
server.put('/employee', FBAuth, editEmployee);
server.put('/employee/status', FBAuth, changeEmployeeStatus);

// task routes
server.get('/tasks', FBAuth, getAllTasks);

exports.api = functions.https.onRequest(server);