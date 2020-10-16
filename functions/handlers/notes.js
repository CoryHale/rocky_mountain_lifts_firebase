const { admin, db } = require('../util/admin');

exports.getCustomerNotes = (req, res) => {
    const customerId = req.params.id;
    const notes = [];

    db.collection('notes').where('customerId', '==', customerId).orderBy('createdAt', 'desc').get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    notes.push(doc.data());
                };
            });
            console.log(notes)
            return res.status(200).json({ notes })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};