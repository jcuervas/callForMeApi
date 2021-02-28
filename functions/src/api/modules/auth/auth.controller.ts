import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Usuario} from "../../../entity/usuario";
import App from "../../app";
import * as jwt from 'jsonwebtoken';
import {Email} from "../../../entity/email";
import util from "../../../util/util";
import useI18n from "../../../services/useI18n";
import mailService from "../../../services/mailService";
const crypto = require('crypto');

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
    console.log({user});
    const access_token = jwt.sign({check: true}, App.app.get('api_key'), {
      expiresIn: 36000
    });
    res.setHeader('access_token', access_token)
    return res.status(200).send();
  }

  async recover(req: any, res: any) {
    try {
      const connection = await connect();
      const {username} = req.params;
      const userRepository = new BaseRepository(connection, Usuario);
      const user = await userRepository.findOneByQuery({username});
      const emailsRepository = new BaseRepository(connection, Email);
      const email = await emailsRepository.findOneByQuery({direccion: username});
      if (email.estado === 'ACTIVADO') {
        const randomPassword = util.generateRandomString();
        user.password = crypto.createHash(randomPassword);
        await userRepository.update(user);
        const locale = util.getLocaleString(user.timezone);
        useI18n.setLocale(locale);
        await mailService.sendEmail(username, {randomPassword}, locale, "recoverPassword");
        return res.json({message: useI18n.get('passwordSent')})
      } else {
        return res.status(500).send(useI18n.get('emailNotConfirmed'))
      }
    } catch (e) {
      if (e.message.includes("Could not find any entity of type \"Usuario\" matching")) {
        return res.status(500).send(useI18n.get("userNotFoundError"))
      }
      console.log(e.message);
    }
  }

  async verifyPin(req: any, res: any) {
    const connection = await connect();
    const {id} = req.params;
    const {registration_pin} = req.query;
    console.log({registration_pin});
    const userRepository = new BaseRepository(connection, Usuario);

    const user = await userRepository.findById(id);
    if (user.num_intentos <= 0) {
      return res.send({message: useI18n.get('maxTriesReached')})
    }
    user.num_intentos--;
    if (user.registration_pin === registration_pin) {
      user.estado = 'PHONE_CONFIRMED';
      await userRepository.update(user);
      res.send(user);
    } else {
      res.status(403).send({error: useI18n.get('wrongPin')})
    }
  }

}
