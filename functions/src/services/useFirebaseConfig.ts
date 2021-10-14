import * as firebase from 'firebase-admin';
import {Injectable} from "@nestjs/common";

export type Parameter = 'maxAlerts';

@Injectable()
export class FirebaseConfig {

  async getConfigValue(key: Parameter): Promise<any> {
    const template = await firebase.remoteConfig().getTemplate();
    return template.parameters[key].defaultValue;
  }
}
