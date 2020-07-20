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

exports.createWorkOrder = (req, res) => {
    const workOrder = {
        customer: req.body.customer,
        serviceDate: req.body.serviceDate,
        serviceTime: req.body.serviceTime,
        serviceDescription: req.body.serviceDescription,
        serviceType: req.body.serviceType,
        crewMembers: req.body.crewMembers,
        prevJobNumber: req.body.prevJobNumber,
        notes: req.body.notes,
        officeNotes: req.body.officeNotes,
        quote: req.body.quote,
        createdAt: new Date().toISOString()
    };

    const {valid, errors} = validateWorkOrderData(workOrder);

    if(!valid) {
        return res.status(400).json(errors);
    };

    db.collection('work-orders').orderBy('createdAt', 'desc').limit(1).get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    workOrder.jobNumber = doc.data().jobNumber + 1;

                };
            });
            return db.doc(`/work-orders/${workOrder.jobNumber}`).set(workOrder);
        })
        .then(() => {
            return res.status(201).json({ message: 'Work order created successfully' })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};