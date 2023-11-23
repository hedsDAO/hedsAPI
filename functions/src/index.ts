// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
admin.initializeApp();

/* APP SERVER */
import auth from './servers/app/auth';
import user from './servers/app/user';
import song from './servers/app/song';
import tape from './servers/app/tape';

/* UTIL SERVER */
import pinata from './servers/utils/pinata';

/*  VOTE SERVER */
import proposal from './servers/vote/proposal';
import space from './servers/vote/space';
import strategy from './servers/vote/strategy';
import vote from './servers/vote/vote';

/* HEDSPACE SERVER */
import mangeEvents from './servers/hedSpace/mangeEvents';
import guestStatus from './servers/hedSpace/guestStatus';
import eventComments from './servers/hedSpace/eventComments';

// API V1
import app from './app';

exports.api = app;

exports.auth = auth;
exports.eventComments = eventComments;
exports.guestStatus = guestStatus;
exports.manageEvents = mangeEvents;
exports.pinata = pinata;
exports.proposal = proposal;
exports.song = song;
exports.space = space;
exports.strategy = strategy;
exports.tape = tape;
exports.user = user;
exports.vote = vote;
