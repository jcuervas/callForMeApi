import adminSdk from "../config/adminSdk";
import * as fs from "fs";
import {endOfDecade} from "date-fns";
import {AxiosResponse} from "axios";

const useStorage = () => {

  async function uploadObjectToBucket(path: string, name: string, data: string): Promise<string> {
    const app = adminSdk.initializeApp();
    fs.writeFileSync(`${path}/${name}`, data);
    const upload = await app.storage().bucket().upload(`${path}/${name}`)
    fs.unlinkSync(`${path}/${name}`);
    const fileUploaded = upload[0];
    await fileUploaded.makePublic();
    const signedUrls = await fileUploaded.getSignedUrl(
      {
        action: 'read',
        expires: endOfDecade(new Date())
      }
    )
    return signedUrls[0];
  }

  async function uploadFileToBucket(file: string): Promise<string> {
    const app = adminSdk.initializeApp();
    const upload = await app.storage().bucket().upload(file)
    fs.unlinkSync(file);
    const fileUploaded = upload[0];
    await fileUploaded.makePublic();
    const signedUrls = await fileUploaded.getSignedUrl(
      {
        action: 'read',
        expires: endOfDecade(new Date())
      }
    )
    return signedUrls[0];
  }

  async function deleteObjectFromBucket(path: string) {
    console.log("should remove", path);
  }

  function writeToFile(response: AxiosResponse, path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(path);
      response.data.pipe(writer);
      let error: Error;
      writer.on('error', (err: Error) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  }


  return {
    uploadObjectToBucket,
    uploadFileToBucket,
    deleteObjectFromBucket,
    writeToFile
  }

}

export default useStorage();
