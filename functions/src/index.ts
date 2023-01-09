

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

// UTILS API
import generateId from "./utils/generateId";
import pinLinkToGateway from "./utils/pinLinkToGateway";

// TWITTER API
import twitterAuth from "./twitter/auth";
import twitterGetUserImage from "./twitter/getUserImage";

// OPENAI API
import openaiGetGeneratedImage from "./openai/getGeneratedImage";

// // PINATA API
// const pinHashToIpfs = require("./pinata/pinHashToIpfs");
// const uploadProposalToIpfs = require("./pinata/uploadProposalToIpfs");
// const unpinProposalFromIpfs = require("./pinata/unpinProposalFromIpfs");

// Moralis User Data Backup
// const dataBackup = require("./dataBackup/dataBackup");

exports.generateId = generateId;
exports.twitterAuth = twitterAuth;
exports.twitterGetUserImage = twitterGetUserImage;
exports.openaiGetGeneratedImage = openaiGetGeneratedImage;
exports.pinLinkToGateway = pinLinkToGateway;
// exports.pinHashToIpfs = pinHashToIpfs.pinHashToIpfs;
// exports.uploadProposalToIpfs = uploadProposalToIpfs.uploadProposalToIpfs;
// exports.unpinProposalFromIpfs = unpinProposalFromIpfs.unpinProposalFromIpfs;
// exports.dataBackup = dataBackup.dataBackup;
