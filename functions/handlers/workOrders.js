const { admin, db } = require('../util/admin');

const { validateWorkOrderData, validateSubmittedWorkOrder } = require('../util/middleware');

exports.getAllWorkOrders = (req, res) => {
    let workOrders = [];

    db.collection('work-orders').orderBy('serviceDate').orderBy('serviceStartTime').get()
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
        serviceStartTime: req.body.serviceStartTime,
        serviceEndTime: req.body.serviceEndTime,
        serviceDescription: req.body.serviceDescription,
        serviceType: req.body.serviceType,
        dispatch: req.user.uid,
        serviceManager: req.body.serviceManager,
        officeManager: req.body.officeManager,
        crewMembers: req.body.crewMembers,
        jobNumber: req.body.jobNumber,
        notes: req.body.notes,
        officeNotes: req.body.officeNotes,
        quote: req.body.quote,
        serviceDone: [],
        crewPunches: [],
        createdAt: new Date().toISOString(),
        status: 'Open'
    };

    const {valid, errors} = validateWorkOrderData(workOrder);

    if(!valid) {
        return res.status(400).json(errors);
    };

    db.doc(`/users/${workOrder.customer}`).get()
        .then(doc => {
            workOrder.customerName = doc.data().businessName;
        })
        .catch(err => {
            console.log(err)
        });

    db.collection('work-orders').orderBy('createdAt', 'desc').limit(1).get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    workOrder.workOrderId = doc.data().workOrderId + 1;
                };
            });
            return db.doc(`/work-orders/${workOrder.workOrderId}`).set(workOrder);
        })
        .then(() => {
            return res.status(201).json({ message: 'Work order created successfully' })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getWorkOrder = (async (req, res) => {
    const jobId = req.params.id;

    if(jobId) {
        const jobDoc = await db.doc(`/work-orders/${jobId}`).get();
        const jobData = jobDoc.data();

        if(!jobData) {
            console.log('Job not found');
            return;
        };

        let users = [];

        users.push(jobData.customer);
        jobData.crewMembers.forEach(member => {
            users.push(member);
        });

        const fetchPromises = [];

        users.forEach(userId => {
            const nextPromise = db.doc(`/users/${userId}`).get();
            fetchPromises.push(nextPromise);
        });

        const snapshots = await Promise.all(fetchPromises);
        const responseArray = snapshots.map(snapshot => snapshot.data());
        
        return res.status(200).json({workOrder: jobDoc.data(), responseArray});
    } else {
        console.error('Something went wrong');
        return res.status(500).json({ error: 'Something went wrong' });
    };
});

exports.editWorkOrder = (req, res) => {
    const update = req.body;

    db.doc(`/work-orders/${req.body.workOrderId}`).update(update)
        .then(() => {
            return res.status(200).json({ message: 'Update successful' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};