import {BaseRepository} from "../repository/repository";
import {Alerta} from "../entity/alerta";
import {Llamada} from "../entity/llamada";
import {connect} from "../services/connection";
import {Usuario} from "../entity/usuario";
import {Notification} from "../entity/notification";
import {Mensaje} from "../entity/mensaje";
import functions = require("firebase-functions");
import plivoService from "../services/plivoService";
import useNotification from "../services/useNotification";
import useI18n from "../services/useI18n";
import util from "../util/util";
import {AlertaService} from "../services/alertaService";
import {FirebaseToken} from "../entity/firebaseToken";

export class CallChecker {

  static async requestCall(req: any, res: any) {
    return res.json(await CallChecker.handleProgrammedCalls());
  }

  static async handle() {
    return CallChecker.handleProgrammedCalls()
  }

  static async handleProgrammedCalls() {
    const connection = await connect();
    const alertaRepository = new BaseRepository(connection, Alerta);
    const alias = 'a';
    const queryBuilder = alertaRepository.getQueryBuilder(alias);
    const alertas: Alerta[] = await queryBuilder
      .where("date(a.fecha) = date(NOW())")
      .leftJoinAndSelect('a.mensaje', 'm')
      .leftJoinAndSelect('a.llamada', 'll')
      .leftJoinAndSelect( 'm.usuario', 'u')
      .leftJoinAndSelect('ll.usuario', 'u2')
      .leftJoinAndSelect('u.notifications', 'n1')
      .leftJoinAndSelect('u2.notifications', 'n2')
      .getMany();

    const messagesToSend: Alerta[] = [],
      messagesToNotifyLowCredit: Alerta[] = [],
      callsToSend: Alerta[] = [],
      callsToNotifyLowCredit: Alerta[] = [];

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
      alertas,
      callsToNotifyLowCredit,
      messagesToNotifyLowCredit: CallChecker.notifyLowCredit(messagesToNotifyLowCredit),
      callsToNotifyLowCreditAction: CallChecker.notifyLowCredit(callsToNotifyLowCredit),
      messagesSent: await CallChecker.sendPlivoMessages(messagesToSend),
      calls: await CallChecker.makePlivoCalls(callsToSend)
    };
  }

  static async notifyLowCredit(alertas: Alerta[]) {
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

  static async sendPlivoMessages(alertas: Alerta[]) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const alertaRepository = new BaseRepository(connection, Alerta);
    const plivoResult = [];
    for (const alerta of alertas) {
      const mensaje = alerta.mensaje as Mensaje;
      const usuario = mensaje.usuario as Usuario;
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

  static async makePlivoCalls(alertas: Alerta[]) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const alertaRepository = new BaseRepository(connection, Alerta);
    const plivoResult = [];
    for (const alerta of alertas) {
      const llamada = await llamadaRepository.findById(alerta.llamada as number)
      await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
      await llamadaRepository.patch(llamada.id_llamada!, {last_update: new Date()});
      const usuario = llamada.usuario as Usuario
      const codPais = usuario.cod_pais;
      functions.logger.log("should call " + codPais + alerta.destinatario)
      plivoResult.push(await plivoService.call({
        source: usuario.cod_pais + usuario.telefono,
        destination: codPais + alerta.destinatario!,
        xml: llamada.storageUrl,
        id_alerta: alerta.id_alerta!
      }))
    }
    return plivoResult;
  }

}
