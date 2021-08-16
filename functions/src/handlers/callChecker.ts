import functions = require("firebase-functions");
import plivoService from "../services/plivoService";
import useNotification from "../services/useNotification";
import useI18n from "../services/useI18n";
import util from "../util/util";
import {connect} from "../services/connection";
import {BaseRepository} from "../repository/repository";
import {Alert} from "../entity/alert";
import {AlertaService} from "../services/alertaService";
import {FirebaseToken} from "../entity/firebaseToken";
import {Message} from "../entity/message";
import {User} from "../entity/user";
import {Call} from "../entity/call";
import {Notification} from "../entity/notification";

export class CallChecker {

  static async requestCall(req: any, res: any) {
    return res.json(await CallChecker.handleProgrammedCalls());
  }

  static async handle() {
    return CallChecker.handleProgrammedCalls()
  }

  static async handleProgrammedCalls() {
    const connection = await connect();
    const alertaRepository = new BaseRepository(connection, Alert);
    const alias = 'a';
    const queryBuilder = alertaRepository.getQueryBuilder(alias);
    const alertas: Alert[] = await queryBuilder
      .where("date(a.fecha) = date(NOW())")
      .andWhere('timestampdiff(minute, a.fecha, NOW()) <= 1')
      .andWhere('timestampdiff(minute, a.fecha, NOW()) >= 0')
      .andWhere("a.estado = 'PROGRAMADA'")
      .leftJoinAndSelect('a.mensaje', 'm')
      .leftJoinAndSelect('a.llamada', 'll')
      .leftJoinAndSelect( 'm.usuario', 'u')
      .leftJoinAndSelect('ll.usuario', 'u2')
      .leftJoinAndSelect('u.notifications', 'n1')
      .leftJoinAndSelect('u2.notifications', 'n2')
      .getMany();

    const messagesToSend: Alert[] = [],
      messagesToNotifyLowCredit: Alert[] = [],
      callsToSend: Alert[] = [],
      callsToNotifyLowCredit: Alert[] = [];

    alertas.forEach(a => {
      const alertaService = new AlertaService(a);
      if (a.mensaje && alertaService.isInMinute() && alertaService.isProgrammed() && alertaService.userHasCreditToOperate()) {
        messagesToSend.push(a);
      }
      if (a.mensaje && alertaService.isProgrammed() && !alertaService.userHasCreditToOperate() && !alertaService.userNotifiedInPeriod()) {
        messagesToNotifyLowCredit.push(a);
      }
      if (a.llamada && alertaService.isInMinute() && alertaService.userHasCreditToOperate() && alertaService.isProgrammed()) {
        callsToSend.push(a);
      }
      if (a.llamada && alertaService.isProgrammed() && !alertaService.userNotifiedInPeriod() && !alertaService.userHasCreditToOperate()) {
        callsToNotifyLowCredit.push(a);
      }
    })
    return {
      messagesToSend,
      callsToSend,
      messagesToNotifyLowCredit: CallChecker.notifyLowCredit(messagesToNotifyLowCredit),
      callsToNotifyLowCreditAction: CallChecker.notifyLowCredit(callsToNotifyLowCredit),
      messagesSent: await CallChecker.sendPlivoMessages(messagesToSend),
      calls: await CallChecker.makePlivoCalls(callsToSend)
    };
  }

  static async notifyLowCredit(alertas: Alert[]) {
    const connection = await connect();
    const notificationRepository = new BaseRepository(connection, Notification);
    const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
    const notifiResult = [];
    for (const alerta of alertas) {
      const alertaService = new AlertaService(alerta);
      const usuario = alertaService.getUsuario();

      useI18n.setLocale(util.getLocaleString(usuario.timezone));
      const firebaseTokens = await firebaseTokensRepository.findByQuery({query: {usuario: usuario.id_usuario}}) as FirebaseToken[]
      if (!firebaseTokens.length) return;
      const notification = new Notification({
        usuario: usuario.id_usuario,
        title: useI18n.get('user_has_low_credit_title'),
        body: useI18n.get('user_has_low_credit_body')
      })
      for (const token of firebaseTokens) {
        const sendResult = await useNotification.sendNotification(token, notification.getNotification());
        notifiResult.push(sendResult);
        if (sendResult.successCount > 0) {
          await notificationRepository.create(notification)
        }
      }
    }
  }

  static async sendPlivoMessages(alertas: Alert[]) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const alertaRepository = new BaseRepository(connection, Alert);
    const plivoResult = [];
    for (const alerta of alertas) {
      const mensaje = alerta.mensaje as Message;
      const usuario = mensaje.usuario as User;
      await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
      await mensajeRepository.patch(mensaje.id_mensaje!, {last_update: new Date()});
      const codPais = usuario.cod_pais;
      functions.logger.log("should send a message to " + codPais + alerta.destinatario)
      plivoResult.push(await plivoService.sendMessage({
        source: usuario.cod_pais + usuario.telefono,
        destination: codPais + alerta.destinatario!,
        message: mensaje.texto
      }))
    }
    return plivoResult;
  }

  static async makePlivoCalls(alertas: Alert[]) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Call);
    const alertaRepository = new BaseRepository(connection, Alert);
    const plivoResult = [];
    for (const alerta of alertas) {
      const llamada = alerta.llamada as Call;
      const usuario = llamada.user as User
      await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
      await llamadaRepository.patch(llamada.id_llamada!, {last_update: new Date()});
      const codPais = usuario.cod_pais;
      functions.logger.log("should call " + codPais + alerta.destinatario)
      plivoResult.push(await plivoService.call({
        source: usuario.cod_pais + usuario.telefono,
        destination: codPais + alerta.destinatario!,
        id_alerta: alerta.id_alerta!
      }))
    }
    return plivoResult;
  }

}
