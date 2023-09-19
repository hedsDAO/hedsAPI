// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
admin.initializeApp();

// USERS API
import user from './servers/user';

// FIREBASE APP
import app from './app';

exports.user = user;
exports.api = app;