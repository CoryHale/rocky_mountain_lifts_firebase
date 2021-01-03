const { admin, db } = require('../util/admin');

const { validateEventData } = require('../util/middleware');

exports.createEvent = (req, res) => {
    const event = req.body;

    const {valid, errors} = validateEventData(event);

    if(!valid) {
        return res.status(400).json(errors);
    };

    db.collection('events').add(event)
        .then(doc => {
            const updatedEvent = {
                ...event,
                extendedProps: {
                    ...event.extendedProps,
                    eventId: doc.id
                }
            };
            return db.doc(`/events/${doc.id}`).update(updatedEvent);
        })
        .then(() => {
            return res.status(201).json({ message: 'Event was created successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getEvents = (req, res) => {
    const events = [];

    db.collection('events').get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    events.push(doc.data());
                };
            });
            return res.status(200).json({ events });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;

    db.doc(`/events/${eventId}`).delete()
        .then(() => {
            return res.status(200).json({ message: 'Event was deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};