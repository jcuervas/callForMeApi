import * as firebase from 'firebase-admin';

export type Parameter = 'numFreeGamesPerDay';
export class FirebaseConfigService {

    async getConfigValue(key: Parameter): Promise<any> {
        const template = await firebase.remoteConfig().getTemplate();
        return template.parameters[key].defaultValue;
    }
}