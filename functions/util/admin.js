const admin = require('firebase-admin');

const serviceAccount = require('../key/private-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rocky-mountain-lifts-crm-db.firebaseio.com',
    storageBucket: "rocky-mountain-lifts-crm-db.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };