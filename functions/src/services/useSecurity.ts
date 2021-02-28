import * as jwt from 'jsonwebtoken';
import util from "../util/util";
const crypto = require('crypto');

const adminToken = 'aso978c8y39v8bfy3948pc';

const algorithm = 'aes-256-gcm';
export const API_KEY: string = process.env.API_KEY as string;
interface Encrypted {
  content: string;
  tag: number[];
  iv: string
}

const useSecurity = () => {
  function encrypt(text: string): Encrypted {
    const iv = util.generateRandomString();
    const cipher = crypto.createCipheriv(algorithm, process.env.CIPHER_PASSWORD, iv);
    let content = cipher.update(text, 'utf8', 'hex');
    content += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return {
      content,
      tag: tag.toJSON().data,
      iv
    };
  }

  function checkApiKey(req: any, res: any, next: any) {
    if (!req.url.includes('emailConfirmation') && req.headers.apikey !== API_KEY) {
      res.status(401).send('Access not authorized');
    }
    next()
  }

  function decrypt(encrypted: Encrypted): string {
    const decipher = crypto.createDecipheriv(algorithm, process.env.CIPHER_PASSWORD, encrypted.iv);
    decipher.setAuthTag(Buffer.from(encrypted.tag));
    let dec = decipher.update(encrypted.content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  function checkIfAuthenticated(req: any, res: any, next: any) {
    getAuthToken(req, async (token: string) => {
      try {
        token === adminToken
        || req.method === 'OPTIONS'
        || jwt.verify(token, API_KEY);
        next();
        return true;
      } catch (e) {
        return res.status(401).send({Output: 'Access not authorized'});
      }
    })
  }

  function getAuthToken(req: any, next: any) {
    let access_token = null;
    if (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer') {
      access_token = req.headers.authorization.split(' ')[1];
    }
    next(access_token);
  }

  return {
    encrypt,
    decrypt,
    checkIfAuthenticated,
    getAuthToken,
    checkApiKey
  }
}

export default useSecurity();

