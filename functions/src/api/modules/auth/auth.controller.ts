import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Usuario} from "../../../entity/usuario";
import App from "../../app";
import * as jwt from 'jsonwebtoken';

export class AuthController {

  async login(req: any, res: any) {
    const connection = await connect();
    const userRepository = new BaseRepository(connection, Usuario);
    const {username, password} = req.headers;
    if (!username || !password) {
      return res.status(403).send("Authentication Error")
    }
    const user = await userRepository.findOneByQuery({username, password})
    if (!user) return res.status(404).send("User not found or password wrong");
    const access_token = jwt.sign({check: true}, App.app.get('api_key'), {
      expiresIn: 36000
    });
    res.setHeader('access_token', access_token)
    return res.status(200).send();
  }
}
