import * as firebase from 'firebase-admin';

export type Parameter = 'numFreeGamesPerDay';
const useFirebaseConfig = () => {

    async function getConfigValue(key: Parameter): Promise<any> {
        const template = await firebase.remoteConfig().getTemplate();
        return template.parameters[key].defaultValue;
    }

    return {
      getConfigValue
    }
}

export default useFirebaseConfig();
