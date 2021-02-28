import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Email} from "../../../entity/email";
import {Usuario} from "../../../entity/usuario";
import {Borrado} from "../../../entity/borrado";
import util from "../../../util/util";
import {FirebaseToken} from "../../../entity/firebaseToken";
import {ConfirmationToken} from "../../../entity/confirmationToken";
import {UserService} from "../../../services/UserService";
import useNotification from "../../../services/useNotification";
import useSecurity, {API_KEY} from "../../../services/useSecurity";
import useI18n from "../../../services/useI18n";

export class EmailsController {

  async getEmailConfirmation(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const confirmationTokenRepository = new BaseRepository(connection, ConfirmationToken);
    const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
    const {token} = req.query;
    const confirmationToken = await confirmationTokenRepository.findOneByQuery({content: token}, ['usuario']);
    if (!confirmationToken) return res.status(404);
    const usuario = await confirmationToken.usuario;
    useI18n.setLocale(util.getLocaleString(usuario.timezone));
    const userService = new UserService(usuario);
    const expiryTime = useSecurity.decrypt(confirmationToken).split(':')[0];
    const key = useSecurity.decrypt(confirmationToken).split(':')[1];
    if (Date.now() > Number(expiryTime)) {
      await userService.sendConfirmationUrlEmail(connection);
      await confirmationTokenRepository.delete(confirmationToken.id!.toString())
      return res.status(403).send(useI18n.get('confirmationTokenExpired'));
    }

    if (key !== API_KEY) {
      return res.status(403).send(useI18n.get('invalidApiKey'))
    }

    const email = await emailRepository.findOneByQuery({usuario: usuario.id_usuario});
    if (!email) {
      await confirmationTokenRepository.delete(confirmationToken.id!.toString())
      return res.send(useI18n.get("userNotFoundError"))
    }
    if (email.estado === 'ACTIVADO') {
      await confirmationTokenRepository.delete(confirmationToken.id!.toString())
      return res.send(useI18n.get("emailAlreadyConfirmed"))
    }
    email.estado = 'ACTIVADO';
    await emailRepository.repository.save(email);
    const firebaseToken = await firebaseTokensRepository.findOneByQuery({usuario: usuario.id_usuario});
    if (!firebaseToken) {
      return res.send({message: 'could not send notification'});
    }

    const locale = util.getLocaleString(usuario.timezone);
    await useNotification.sendNotification(firebaseToken, {
      notification: {
        title: useI18n.get('emailConfirmedTitle'),
        body: useI18n.get('emailConfirmedBody'),
        clickAction: 'EMAIL_CONFIRMED'
      },
      data: {
        id_email: email.id_email!.toString(),
        direccion: email.direccion,
        estado: email.estado,
        usuario: usuario.id_usuario!.toString(),
        identificador: token
      },
    })
    useI18n.setLocale(locale);
    await confirmationTokenRepository.delete(confirmationToken.id!.toString())
    return res.send(useI18n.get('TEXT_CONF_EMAIL'))
  }

  async get(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const {direccion, usuario, estado} = req.query;
    let emails: Email | Email[] | null = null;
    if (direccion || usuario || estado) {
      emails = await emailRepository.findByQuery({direccion, usuario, estado});
    }

    if (!emails) return res.status(404);
    return res.json({emails});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const id_email = req.params.id_email;
    const email = await emailRepository.findById(id_email);

    if (!email) return res.status(404);
    return res.json({email});
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    return res.json(await emailRepository.patch(req.params.id_email, req.body.email));
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const usuarioRepository = new BaseRepository(connection, Usuario);

    const usuario = await usuarioRepository.findById(req.query.usuario);
    const userService = new UserService(usuario);
    const signature = await userService.sendConfirmationUrlEmail(connection);

    const email = new Email({
      identificador: signature,
      estado: 'NO_CONFIRMADO',
      ...req.body
    })

    return res.json(await emailRepository.create(email));

  }

  async put(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const email = new Email({id_email: req.params.id, ...req.body.email});
    return res.json(await emailRepository.update(email));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const emailRepository = new BaseRepository(connection, Email);
    const borradosRepository = new BaseRepository(connection, Borrado);

    const id = req.params.id;
    const email = await emailRepository.findById(id);
    await borradosRepository.create(new Borrado({
      tabla: 'Emails',
      usuario: email.usuario,
      elemento: id,
      fecha: new Date()
    }))
    await emailRepository.delete(id);
    return res.send();
  }

}
