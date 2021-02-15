import * as admin from 'firebase-admin';
import {configuration} from "./environment";
import firebase from "firebase";

export class AdminSdk {
    app?: admin.app.App;
    firebaseApp?: firebase.app.App;

    initializeApp(): admin.app.App {
      console.log({app: this.app});
        if (!this.app) {
            this.app = admin.initializeApp({
                credential: admin.credential.cert(configuration.serviceAccount)
            });
        }
        return this.app;
    }

    initializeFirebaseApp(): firebase.app.App {
        if (!this.firebaseApp) {
            this.firebaseApp = firebase.initializeApp({
                credential: admin.credential.cert(configuration.serviceAccount)
            });
        }

        return this.firebaseApp;
    }
}
