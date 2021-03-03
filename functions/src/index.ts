import * as functions from 'firebase-functions';
import App from './api/app';

exports.app = functions.https.onRequest(App.app);

// exports.callChecker = functions.pubsub.schedule('* * * * *').onRun(CallChecker.handle)
// exports.messageChecker = functions.pubsub.schedule('* * * * *').onRun(CallChecker.handle)
