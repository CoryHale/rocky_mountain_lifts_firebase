const functions = require('firebase-functions');
const cors = require('cors');
const server = require('express')();
const FBAuth = require('./util/fbAuth');

cors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE']
});

const { db } = require('./util/admin');

server.use(cors());

const { 
    registerEmployee,
    login, 
    getAuthenticatedUser,
    getAllEmployees,
    getAllCustomers,
    getAllUsers,
    editEmployee,
    changeEmployeeStatus,
    registerCustomer,
    editCustomer,
    getCustomer,
    addEmployeeToCustomer
} = require('./handlers/users');

const {
    getCustomerNotes
} = require('./handlers/notes');

const {
    getAllTasks,
    getCustomerTasks,
    createTask
} = require('./handlers/tasks');

const {
    getAllWorkOrders,
    createWorkOrder,
    getWorkOrder,
    submitWorkOrderForReview,
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
server.post('/c_register', FBAuth, registerCustomer);
server.put('/customer', FBAuth, editCustomer);
server.get('/customer/:id', FBAuth, getCustomer);
server.put('/customer', FBAuth, addEmployeeToCustomer);

// notes routes
server.get('/notes/:id', FBAuth, getCustomerNotes);

// task routes
server.get('/tasks', FBAuth, getAllTasks);
server.get('/customer_tasks/:id', FBAuth, getCustomerTasks);
server.post('/tasks', FBAuth, createTask);

// work order routes
server.get('/work_orders', FBAuth, getAllWorkOrders);
server.post('/work_orders', FBAuth, createWorkOrder);
server.get('/work_order/:id', FBAuth, getWorkOrder);
server.put('/work_order', FBAuth, submitWorkOrderForReview);

exports.api = functions.https.onRequest(server);