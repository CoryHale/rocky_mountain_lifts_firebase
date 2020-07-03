const { admin, db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateLoginData } = require('../util/middleware');

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if(!valid) {
        return res.status(400).json(errors);
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.status(200).json({ token });
        })
        .catch(err => {
            console.error(err);
            return res.status(403).json({ general: 'email or password is incorrect' });
        });
};

exports.getAuthenticatedUser = (req, res) => {
    let userData = {};

    console.log(req.user.uid)

    db.doc(`/users/${req.user.uid}`).get()
        .then(doc => {
            if(doc.exists) {
                userData.credentials = doc.data();
                return res.status(200).json(userData);
            } else {
                return res.status(404).json({ error: 'User not found' });
            };
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};