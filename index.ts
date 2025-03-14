// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
// import * as functions from 'firebase-functions';
admin.initializeApp();

/* APP SERVER */
import auth from "./servers/app/auth";
import user from "./servers/app/user";
import song from "./servers/app/song";
import tape from "./servers/app/tape";

/* BACKBLAZE SERVER */
// import backblazeReadFile from "./servers/backblaze/readFile";
// import backblazeTranscoder from "./servers/backblaze/transcoder";

/* UTIL SERVER */
import pinata from "./servers/utils/pinata";
import privy from "./servers/utils/privy";
import stripe from "./servers/utils/stripe";
import twilio from "./servers/utils/twilio";

/*  VOTE SERVER */
import proposal from "./servers/vote/proposal";
import space from "./servers/vote/space";
import strategy from "./servers/vote/strategy";
import vote from "./servers/vote/vote";

/* HEDSPACE SERVER */
import applePass from "./servers/hedSpace/applePass";
import mangeEvents from "./servers/hedSpace/mangeEvents";
import guestStatus from "./servers/hedSpace/guestStatus";
import eventComments from "./servers/hedSpace/eventComments";

/* HEDSWORLD SERVER */
import catalog from "./servers/hedsWorld/catalog";
import checkout from "./servers/hedsWorld/checkout";

exports.applePass = applePass;
exports.auth = auth;
// exports.backblazeReadFile = backblazeReadFile;
// exports.backblazeTranscoder = backblazeTranscoder;
exports.catalog = catalog;
exports.checkout = checkout;
exports.eventComments = eventComments;
exports.guestStatus = guestStatus;
exports.manageEvents = mangeEvents;
exports.pinata = pinata;
exports.privy = privy;
exports.proposal = proposal;
exports.song = song;
exports.space = space;
exports.strategy = strategy;
exports.stripe = stripe;
exports.tape = tape;
exports.twilio = twilio;
exports.user = user;
exports.vote = vote;
