import * as functions from 'firebase-functions';
import {CallChecker} from "./handlers/callChecker";
import {createApi, expressServer} from "src/api/createApi";

exports.api = functions.https.onRequest(async (req, res) => {
  await createApi(expressServer)
  expressServer(req, res)
});

exports.callChecker = functions.pubsub.schedule('* * * * *').onRun(CallChecker.handle)
