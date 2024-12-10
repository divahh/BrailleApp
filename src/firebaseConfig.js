const admin = require('firebase-admin');
const serviceAccount = require('../brailleapps-2aa76b9eb1f9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
