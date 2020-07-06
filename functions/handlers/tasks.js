const { admin, db } = require('../util/admin');

exports.getAllTasks = (req, res) => {
    const tasks = [];
    db.collection('tasks').where('assignedTo', '==', req.user.uid).get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    tasks.push(doc.data());
                }
            });
            return res.status(200).json({ tasks })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};