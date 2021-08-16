import {User} from "../entity/user";
import {
  addBusinessDays,
  differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarWeeks, differenceInCalendarYears,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes
} from "date-fns";
import {ConfirmationToken} from "../entity/confirmationToken";
import {configuration, environment} from "../config/environment";
import {BaseRepository} from "../repository/repository";
import {Connection} from "typeorm";
import {Configuracion} from "../entity/configuracion";
import {Email} from "../entity/email";
import mailService from "../services/mailService";
import util from "../util/util";
import useSecurity, {API_KEY} from "./useSecurity";
import plivoService from "./plivoService";
import useI18n from "./useI18n";
import {Notification} from "../entity/notification";
import { convertToTimeZone } from 'date-fns-timezone';

export class UserService {

  constructor(private user: User) {}

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

  hasCreditToOperate() {
    return this.user.credito >= configuration.plivo.minCreditToOperate;
  }

  creditGoesBelowMinToNotify() {
    return this.user.credito <= configuration.plivo.creditMinNotification;
  }

  getLastNotification(): Notification|undefined {
    const sortedNotifications = this.user.notifications
      && this.user.notifications.sort((n1, n2) =>
        differenceInMilliseconds(new Date(n1.created!), new Date(n2.created!)) > 0 ? -1 : 1);
    return sortedNotifications && sortedNotifications[0];
  }

  isNotifiedInPeriod() {
    const lastNotification = this.getLastNotification();
    if (!lastNotification) return false;
    const now = convertToTimeZone(new Date(), {timeZone: 'UTC'});
    const created = new Date(lastNotification.created!);
    switch (configuration.plivo.maxNotificationPeriod) {
      case "minute":
        return differenceInMinutes(now, created) < 1;
      case "hour":
        return differenceInHours(now, created) < 1;
      case "day":
        return differenceInCalendarDays(now, created) < 1;
      case "week":
        return differenceInCalendarWeeks(now, created) < 1;
      case "month":
        return differenceInCalendarMonths(now, created) < 1;
      case "year":
        return differenceInCalendarYears(now, created) < 1;
    }
  }
}
