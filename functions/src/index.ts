import * as functions from 'firebase-functions';
import App from './api/app';
import {CallChecker} from "./handlers/callChecker";

exports.app = functions.https.onRequest(App.app);

exports.callChecker = functions.pubsub.schedule('* * * * *').onRun(CallChecker.handle)
