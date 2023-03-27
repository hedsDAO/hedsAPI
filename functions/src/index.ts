// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
admin.initializeApp();

// TWITTER CONTROLLER
import twitterAuth from './servers/authentication';

// SUBMISSIONS CONTROLLER
import newSubmission from './servers/submissions';

// OPENSEA CONTROLLER
import activeListings from './servers/opensea';

// FIRESTORE CONTROLLER
import users from './servers/users';

exports.twitterAuth = twitterAuth;
exports.newSubmission = newSubmission;
exports.activeListings = activeListings;
exports.users = users;

import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users';
import songRoutes from './routes/songs';
import tapeRoutes from './routes/tapes';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/song', songRoutes);
app.use('/tape', tapeRoutes);

exports.api = functions.https.onRequest(app);
