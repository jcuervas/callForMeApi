import {AdminSdk} from "../config/adminSdk";
import {FirebaseToken} from "../entity/firebaseToken";
import admin from "firebase-admin";
import MessagingPayload = admin.messaging.MessagingPayload;

const useNotification = () => {

  async function sendNotification(token: FirebaseToken, payload: MessagingPayload) {
    const adminSdk = new AdminSdk();
    const app = adminSdk.initializeApp();
    return app.messaging().sendToDevice(token.token, payload);
  }
  return {
    sendNotification
  }
}

export default useNotification();
