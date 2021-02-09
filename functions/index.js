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
    getCurrentUser,
    registerEmployee,
    login,
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
    getAllTasks,
    getCustomerTasks,
    createTask,
    editTask,
    deleteTask,
} = require('./handlers/tasks');

const {
    createEvent,
    getEvents,
    deleteEvent
} = require('./handlers/events');

const {
    getAllWorkOrders,
    createWorkOrder,
    getWorkOrder,
    editWorkOrder,
    deleteWorkOrder,
} = require('./handlers/workOrders');

const {
    createNote,
    getCustomerNotes,
} = require('./handlers/notes');

// user routes
server.get('/currentUser', FBAuth, getCurrentUser);
server.post('/e_register', FBAuth, registerEmployee);
server.post('/login', login);
server.get('/employees', FBAuth, getAllEmployees);
server.get('/customers', FBAuth, getAllCustomers);
server.get('/users', FBAuth, getAllUsers);
server.put('/employee', FBAuth, editEmployee);
server.put('/employee/status', FBAuth, changeEmployeeStatus);
server.post('/c_register', FBAuth, registerCustomer);
server.put('/customer', FBAuth, editCustomer);
server.get('/customer/:id', FBAuth, getCustomer);
server.put('/customer-employee', FBAuth, addEmployeeToCustomer);

// task routes
server.get('/tasks', FBAuth, getAllTasks);
server.get('/customer_tasks/:id', FBAuth, getCustomerTasks);
server.post('/tasks', FBAuth, createTask);
server.put('/task', FBAuth, editTask);
server.delete('/task/:id', FBAuth, deleteTask);

// event routes
server.post('/events', FBAuth, createEvent);
server.get('/events', FBAuth, getEvents);
server.delete('/event/:id', FBAuth, deleteEvent);

// work order routes
server.get('/work_orders', FBAuth, getAllWorkOrders);
server.post('/work_orders', FBAuth, createWorkOrder);
server.get('/work_order/:id', FBAuth, getWorkOrder);
server.put('/work_order', FBAuth, editWorkOrder);
server.delete('/work_order/:id', FBAuth, deleteWorkOrder);

// notes routes
server.post('/notes', FBAuth, createNote);
server.get('/notes/:id', FBAuth, getCustomerNotes);

exports.api = functions.https.onRequest(server);