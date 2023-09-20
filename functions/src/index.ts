// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
admin.initializeApp();

// AUTH API
import auth from './servers/auth';

// USERS API
import user from './servers/user';

// API V1
import app from './app';

exports.api = app;
exports.auth = auth;
exports.user = user;