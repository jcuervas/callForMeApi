import adminSdk from "../config/adminSdk";
import {FirebaseToken} from "../entity/firebaseToken";
import admin from "firebase-admin";
import MessagingPayload = admin.messaging.MessagingPayload;
import MessagingDevicesResponse = admin.messaging.MessagingDevicesResponse;

const useNotification = () => {

  async function sendNotification(token: FirebaseToken, payload: MessagingPayload): Promise<MessagingDevicesResponse> {
    const app = adminSdk.initializeApp();
    return app.messaging().sendToDevice(token.token, payload);
  }
  return {
    sendNotification
  }
}

export default useNotification();
