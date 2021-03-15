import {connect} from "../../../services/connection";
import {Respuesta} from "../../../entity/respuesta";
import {BaseRepository} from "../../../repository/repository";
import {Usuario} from "../../../entity/usuario";
import {UserService} from "../../../services/UserService";
import stripeService from "../../../services/stripeService";
import * as jwt from "jsonwebtoken";
import App from "../../app";
import useI18n from "../../../services/useI18n";
import {FirebaseToken} from "../../../entity/firebaseToken";

export class UsuarioController {

  async get(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, Usuario);
    const {tipo, evento, llamada, mensaje, username} = req.query;
    let usuarios: Usuario | Usuario[];
    if (tipo || evento || llamada || mensaje || username) {
      usuarios = await usuarioRepository.findByQuery({query: {tipo, evento, llamada, mensaje, username}})
    } else {
      usuarios = await usuarioRepository.findAll();
    }
    return res.json({usuarios});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, Usuario);
    const {id} = req.params;
    let results: Usuario;
    results = await usuarioRepository.findById(id);
    return res.json(results);
  }

  async post(req: any, res: any) {
    try {
      const connection = await connect();
      const usuarioRepository = new BaseRepository(connection, Usuario);
      const firebaseTokenBaseRepository = new BaseRepository(connection, FirebaseToken);
      const {device} = req.headers;
      const usuario = new Usuario(req.body);

      usuario.registration_pin = Math.floor(Math.random() * 9000 + 1000).toFixed(0);
      if (usuario.cod_pais.includes('44') && usuario.telefono[0] === '0') {
        usuario.telefono = usuario.telefono.substring(1);
      }
      usuario.stripe_id = await stripeService.createCustomer(usuario.username);
      await usuarioRepository.create(usuario);
      const userService = new UserService(usuario);
      await usuarioRepository.update(usuario);
      const firebaseToken = (await firebaseTokenBaseRepository.findByQuery({query: {device}, limit: 1})) as FirebaseToken;
      firebaseToken.usuario = usuario.id_usuario;
      await firebaseTokenBaseRepository.update(firebaseToken);
      await userService.saveEmail(connection)
      await userService.saveDefaultConfiguration(connection);
      await userService.sendConfirmationUrlEmail(connection);
      await userService.sendUserActivationPin();
      const access_token = jwt.sign({check: true}, App.app.get('api_key'), {
        expiresIn: 36000
      });
      res.setHeader('access_token', access_token)
      return res.send(usuario);
    } catch (e) {
      if (e.message.includes('ER_DUP_ENTRY')) {
        return res.status(400).send(useI18n.get('userDuplicatedError'))
      } else {
        throw e;
      }
    }
  }

  async sendPin(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, Usuario);
    const {id} = req.params;
    const user = await usuarioRepository.findById(id);
    user.registration_pin = Math.floor(Math.random() * 9000 + 1000).toFixed(0);
    await usuarioRepository.update(user);
    const userService = new UserService(user);
    await userService.sendUserActivationPin();
    return res.send(user);
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, Usuario);
    const usuario = new Usuario(req.body);
    return res.json(await usuarioRepository.update(usuario));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    return res.json(await respuestaRepository.patch(req.params.id_respuesta, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, Usuario);
    const {id} = req.params;
    await usuarioRepository.delete(id);
    return res.send();
  }
}
