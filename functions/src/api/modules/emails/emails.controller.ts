import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Email} from "../../../entity/email";
import md5 from "md5";
import {EMAIL_KEY} from "../../../util/constants";
import {configuration} from "../../../../config/environment";
import {Usuario} from "../../../entity/usuario";
import {MailService} from "../../../services/mail.service";
import {Borrado} from "../../../entity/borrado";
import util from "../../../util/util";
import {NotificationsService} from "../../../services/notifications.service";
import {FirebaseToken} from "../../../entity/firebaseToken";
import i18nService from '../../../services/i18n.service';

export class EmailsController {

    async getEmailConfirmation(req: any, res: any) {
        const connection = await connect();
        const emailRepository = new BaseRepository(connection, Email);
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        const identificador = req.params.identificador;
        const email = await emailRepository.findOneByQuery({identificador});
        if (!email) return res.status(404);
        email.estado = 'ACTIVADO';
        await emailRepository.repository.save(email);
        const usuario = await usuarioRepository.findById(email.usuario);
        const firebaseToken = await firebaseTokensRepository.findOneByQuery({usuario: usuario.id_usuario});
        if (!firebaseToken) {
            return res.send({message: 'could not send notification'});
        }

        const locale = util.getLocaleString(usuario.timezone);
        await NotificationsService.sendNotification(firebaseToken, {
            notification: {
                title: 'Email confirmado.',
                body: '',
                clickAction: 'EMAIL_CONFIRMED'
            },
            data: {
                id_email: email.id_email!.toString(),
                direccion: email.direccion,
                estado: email.estado,
                usuario: email.usuario.toString(),
                identificador
            },
        })

        i18nService.setLocale(locale);
        return res.send(i18nService.get('TEXT_CONF_EMAIL'))

    }

    async get(req: any, res: any) {
        const connection = await connect();
        const emailRepository = new BaseRepository(connection, Email);
        const {direccion, usuario, estado, last_update} = req.query;
        let emails: Email|Email[]|null = null;
        if (direccion || usuario || estado || last_update) {
            emails = await emailRepository.findByQuery({direccion, usuario, estado, last_update});
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
        const signature = md5(`${Date.now()}:${EMAIL_KEY}`);
        const confirmationUrl = configuration.apiUrl + '/EmailConfirmation/' + signature;

        const usuario = await usuarioRepository.findById(req.body.usuario);
        const emailService = new MailService();
        await emailService.sendEmail(usuario.username, confirmationUrl, util.getLocaleString(usuario.timezone), "emailConfirmation")

        const email = new Email({
            identificador: signature,
            estado: 'NO_CONFIRMADO',
            ...req.body.email})

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
        await borradosRepository.create(new Borrado({tabla: 'Emails', usuario: email.usuario, elemento: id, fecha: new Date()}))
        await emailRepository.delete(id);
        return res.send();
    }

}
