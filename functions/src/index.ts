// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();

// TWITTER CONTROLLER
import twitterAuth from './servers/authentication';

// SUBMISSIONS CONTROLLER
import newSubmission from './servers/submissions';

// OPENSEA CONTROLLER
import activeListings from './servers/opensea';

// FIRESTORE CONTROLLER
import users from './servers/users';

// FIREBASE APP
import app from './app';

exports.twitterAuth = twitterAuth;
exports.newSubmission = newSubmission;
exports.activeListings = activeListings;
exports.users = users;

export default functions
.runWith({
  vpcConnector: "heds-app-connector",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
})
.https.onRequest(app);