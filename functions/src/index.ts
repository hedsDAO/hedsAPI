// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

// TWITTER CONTROLLER
import twitterAuth from "./servers/authentication";

// SUBMISSIONS CONTROLLER
import newSubmissionArt from "./servers/submissions";

exports.twitterAuth = twitterAuth;
exports.newSubmissionArt = newSubmissionArt;
