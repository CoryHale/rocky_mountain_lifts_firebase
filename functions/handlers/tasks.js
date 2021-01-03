const { admin, db } = require('../util/admin');

const { validateTaskData } = require('../util/middleware');

exports.getAllTasks = (req, res) => {
    const tasks = [];
    db.collection('tasks').where('employeeId', '==', req.user.uid).get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    tasks.push(doc.data());
                };
            });
            return res.status(200).json({ tasks })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getCustomerTasks = (req, res) => {
    const tasks = [];
    db.collection('tasks').where('customerId', '==', req.params.id).orderBy('taskDate').orderBy('taskTime').get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    tasks.push(doc.data());
                };
            });
            return res.status(200).json({ tasks });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.createTask = (req, res) => {
    const task = req.body;
    
    const {valid, errors} = validateTaskData(task);

    if(!valid) {
        return res.status(400).json(errors);
    };

    db.collection('tasks').add(task)
        .then(() => {
            return res.status(201).json({ message: 'Task was created successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};