import {AdminSdk} from "../../config/adminSdk";
import {FirebaseToken} from "../entity/firebaseToken";
import admin from "firebase-admin";
import MessagingPayload = admin.messaging.MessagingPayload;

export class NotificationsService {

    static async sendNotification(token: FirebaseToken, payload: MessagingPayload) {
        const adminSdk = new AdminSdk();
        const app = adminSdk.initializeApp();
        await app.messaging().sendToDevice(token.token, payload);
    }
}