import * as functions from 'firebase-functions';
import {createApi, expressServer} from "./api/createApi";

exports.api = functions.https.onRequest(async (req, res) => {
  await createApi(expressServer)
  expressServer(req, res)
});

