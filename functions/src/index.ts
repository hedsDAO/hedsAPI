// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
admin.initializeApp();

/* APP SERVER */
import auth from './servers/app/auth';
import user from './servers/app/user';

/*  VOTE SERVER */
import proposal from './servers/vote/proposal';
import space from './servers/vote/space';
import strategy from './servers/vote/strategy';
import vote from './servers/vote/vote';

// API V1
import app from './app';

exports.api = app;
exports.auth = auth;
exports.proposal = proposal;
exports.space = space;
exports.strategy = strategy;
exports.user = user;
exports.vote = vote;