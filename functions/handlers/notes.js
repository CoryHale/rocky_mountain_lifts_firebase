const { admin, db } = require('../util/admin');

exports.createNote = (req, res) => {
    const note = req.body;

    db.collection('notes').add(note)
        .then((doc) => {
            const updatedNote = {
                ...note,
                noteId: doc.id
            };
            return db.doc(`/notes/${doc.id}`).update(updatedNote);
        })
        .then(() => {
            return res.status(201).json({ message: 'Note was created successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getCustomerNotes = (req, res) => {
    const customerId = req.params.id;
    const notes = [];

    db.collection('notes').where('customerId', '==', customerId).orderBy('createdOnDate', 'desc').orderBy('createdAtTime', 'desc').get()
        .then(data => {
            console.log(data)
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