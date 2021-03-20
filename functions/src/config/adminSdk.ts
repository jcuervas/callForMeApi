import * as admin from 'firebase-admin';
import {configuration} from "./environment";
import firebase from "firebase";

export class AdminSdk {

    initializeApp(): admin.app.App {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(configuration.serviceAccount)
            });
        }
        return admin.app();
    }

    initializeFirebaseApp(): firebase.app.App {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: admin.credential.cert(configuration.serviceAccount)
            });
        }

        return firebase.app();
    }
}

export default new AdminSdk();
