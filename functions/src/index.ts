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
import users from "./servers/users";


exports.twitterAuth = twitterAuth;
exports.newSubmission = newSubmission;
exports.activeListings = activeListings;
exports.users = users;