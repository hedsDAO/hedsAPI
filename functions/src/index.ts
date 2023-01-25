// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

// TWITTER CONTROLLER
import twitterAuth from "./servers/authentication";

// SUBMISSIONS CONTROLLER
import newSubmissionArt from "./servers/submissions";

// OPENSEA CONTROLLER
import activeListings from "./servers/opensea";

exports.twitterAuth = twitterAuth;
exports.newSubmissionArt = newSubmissionArt;
exports.activeListings = activeListings;
