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
    getAllUsers,
    editEmployee,
    changeEmployeeStatus,
    getUsersInWorkOrder
} = require('./handlers/users');

const {
    getAllTasks
} = require('./handlers/tasks');

const {
    getAllWorkOrders,
    createWorkOrder
} = require('./handlers/workOrders');

// user routes
server.post('/e_register', FBAuth, registerEmployee);
server.post('/login', login);
server.get('/user', FBAuth, getAuthenticatedUser);
server.get('/employees', FBAuth, getAllEmployees);
server.get('/customers', FBAuth, getAllCustomers);
server.get('/users', FBAuth, getAllUsers);
server.put('/employee', FBAuth, editEmployee);
server.put('/employee/status', FBAuth, changeEmployeeStatus);
server.get('/work_order/:id/users', FBAuth, getUsersInWorkOrder);

// task routes
server.get('/tasks', FBAuth, getAllTasks);

// work order routes
server.get('/work_orders', FBAuth, getAllWorkOrders);
server.post('/work_orders', FBAuth, createWorkOrder);

exports.api = functions.https.onRequest(server);