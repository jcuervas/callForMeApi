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
}

export default new AdminSdk();
