import * as admin from 'firebase-admin';
import {configuration} from "./environment";
import firebase from "firebase/app";

export class AdminSdk {

  initializeApp(): admin.app.App {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(configuration.serviceAccount),
        storageBucket: configuration.storageBucket
      });
    }
    return admin.app();
  }

  initializeFirebaseApp(): firebase.app.App {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: admin.credential.cert(configuration.serviceAccount),
        storageBucket: configuration.storageBucket
      });
    }
    return firebase.app();
  }

  async getFirebaseUser(token: string) {
    const verifiedToken = await admin.auth().verifyIdToken(token)
    return admin.auth().getUser(verifiedToken.uid)
  }

  async verifyBearerToken(bearer?: string) {
    const verifiedToken = bearer && await admin.auth().verifyIdToken(bearer)
    return !!verifiedToken
  }
}

export default new AdminSdk();
