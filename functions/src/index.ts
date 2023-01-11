// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

// TWITTER CONTROLLER
import twitterAuth from "./controllers/authentication";

// SUBMISSIONS CONTROLLER
import newSubmissionArt from "./controllers/submissions";

exports.twitterAuth = twitterAuth;
exports.newSubmissionArt = newSubmissionArt;
