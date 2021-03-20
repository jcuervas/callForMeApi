import http from 'axios';
import firebase from "firebase";

const useStorage = () => {

  async function uploadObjectToBucket(app: firebase.app.App, data: string, url: string) {
    let upload
    if (!data) {
      const response = await http.get(url);
      upload = await app.storage().ref(`answers/${url}_${Date.now()}`).put(response.data)
    } else {
      upload = await app.storage().ref(`answers/${url}_${Date.now()}`).putString(data)
    }

    return await upload.ref.getDownloadURL();
  }

  async function deleteObjectFromBucket(path: string) {
    await firebase.storage().ref(path).delete();
  }

  return {
    uploadObjectToBucket,
    deleteObjectFromBucket
  }

}

export default useStorage();
