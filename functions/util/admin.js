const admin = require('firebase-admin');

const serviceAccount = require('../key/rocky-mountain-lifts-crm-db-firebase-adminsdk-ogxew-07262a988e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rocky-mountain-lifts-crem-db.firebaseio.com',
    storageBucket: "rocky-mountain-lifts-crm-db.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };