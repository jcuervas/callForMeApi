import {Usuario} from "../entity/usuario";
import {addBusinessDays} from "date-fns";
import {ConfirmationToken} from "../entity/confirmationToken";
import {configuration, environment} from "../../config/environment";
import {BaseRepository} from "../repository/repository";
import {Connection} from "typeorm";
import {Configuracion} from "../entity/configuracion";
import {Email} from "../entity/email";
import mailService from "../services/mailService";
import util from "../util/util";
import useSecurity, {API_KEY} from "./useSecurity";
import plivoService from "./plivoService";
import useI18n from "./useI18n";

export class UserService {

  constructor(private user: Usuario) {}

  async saveDefaultConfiguration(connection: Connection) {
    const configuracionBaseRepository = new BaseRepository(connection, Configuracion);

    const userConfig = new Configuracion({
      usuario: this.user.id_usuario,
      not_credito_bajo: true,
      not_llamadas_post: true,
      not_mensajes_post: true,
      not_llamadas_pre: true,
      not_mensajes_pre: true,
      not_eventos_pre: true
    });
    await configuracionBaseRepository.create(userConfig);
  }

  async sendConfirmationUrlEmail(connection: Connection) {
    const confirmationTokenBaseRepository = new BaseRepository(connection, ConfirmationToken);
    const expiryTime = addBusinessDays(new Date(), 14).getTime();
    const enc = useSecurity.encrypt(`${expiryTime}:${API_KEY}`);
    const confirmationToken = new ConfirmationToken({usuario: this.user.id_usuario!, ...enc})
    await confirmationTokenBaseRepository.create(confirmationToken);
    const emailConfirmationUrl = configuration.apiUrl + '/emailConfirmation?token=' + enc.content;
    await mailService.sendEmail(this.user.username, {emailConfirmationUrl}, util.getLocaleString(this.user.timezone), 'emailConfirmation');
    return enc.content;
  }

  async saveEmail(connection: Connection) {
    const emailBaseRepository = new BaseRepository(connection, Email);
    const email = new Email({
      direccion: this.user.username,
      estado: 'NO_CONFIRMADO',
      usuario: this.user.id_usuario,
      identificador: ''
    });
    await emailBaseRepository.create(email);
  }

  async sendUserActivationPin() {
    if (environment === 'local') return;
    const plivoResult = await plivoService.sendMessage({
      source: '111111111',
      destination: this.user.cod_pais + this.user.telefono,
      message: useI18n.get('TEXT_PIN_REGISTRATION') + this.user.registration_pin
    })
    console.log({plivoResult});
  }
}
