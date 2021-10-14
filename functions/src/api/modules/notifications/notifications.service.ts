import admin from "firebase-admin";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Notification} from './notification.entity'
import {Repository} from "typeorm";
import MessagingPayload = admin.messaging.MessagingPayload;
import MessagingDevicesResponse = admin.messaging.MessagingDevicesResponse;
import adminSdk from "../../../config/adminSdk";
import {FirebaseToken} from "../firebaseTokens/firebaseToken.entity";

@Injectable()
export class NotificationsService {

  constructor(@InjectRepository(Notification) private repository: Repository<Notification>) {
  }

  getRepository() {
    return this.repository
  }

  async sendNotification(token: FirebaseToken, payload: MessagingPayload): Promise<MessagingDevicesResponse> {
    const app = adminSdk.initializeApp();
    return app.messaging().sendToDevice(token.token, payload);
  }
}

