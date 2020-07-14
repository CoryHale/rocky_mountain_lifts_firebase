const { admin, db } = require('../util/admin');

exports.getAllWorkOrders = (req, res) => {
    let workOrders = [];

    db.collection('work-orders').get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    workOrders.push(doc.data());
                };
            });
            return res.status(200).json({ workOrders });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};