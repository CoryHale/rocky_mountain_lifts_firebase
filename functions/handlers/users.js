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

    let response = {};

    db.collection('users').where('email', '==', user.email).limit(1).get()
        .then(data => {
            response.userType = data.docs[0].data().userType;
            response.firstName = data.docs[0].data().firstName;
            response.lastName = data.docs[0].data().lastName;
            response.userId = data.docs[0].data().userId;
            response.tierLevel = data.docs[0].data().tierLevel;
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        })
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.status(200).json({ response, token });
        })
        .catch(err => {
            console.error(err);
            return res.status(403).json({ general: 'email or password is incorrect' });
        });
};

exports.getAuthenticatedUser = (req, res) => {
    let userData = {};

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

exports.getAllEmployees = (req, res) => {
    let employees = [];

    db.collection('users').where('userType', '==', 'employee').get()
        .then(data => {
            data.forEach(doc => {
                if(doc.exists) {
                    employees.push(doc.data());
                }
            });
            return res.status(200).json({ employees })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};