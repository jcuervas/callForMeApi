import http from 'axios';
import firebase from "firebase";

export class StorageService {

    static async uploadObjectToBucket(app: firebase.app.App, url: string, format: string) {
        const response = await http.get(url);
        const upload = await app.storage().ref(`answers/${url}_${Date.now()}`).put(response.data)
        return await upload.ref.getDownloadURL();
    }

    static async deleteObjectFromBucket(path: string) {
        await firebase.storage().ref(path).delete();
    }


}
