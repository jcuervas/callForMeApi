import {BaseRepository} from "../repository/repository";
import {Alerta} from "../entity/alerta";
import {Llamada} from "../entity/llamada";
import {connect} from "../services/connection";
import {Usuario} from "../entity/usuario";
import {Mensaje} from "../entity/mensaje";
import functions = require("firebase-functions");
import plivoService from "../services/plivoService";

export class CallChecker {

  static async handle() {
    const connection = await connect();
    const alertaRepository = new BaseRepository(connection, Alerta);
    const alias = 'a';
    const queryBuilder = alertaRepository.getQueryBuilder(alias);
    alertaRepository.joinSingleRelations(queryBuilder,
      [
        {entity: Llamada, name: 'llamada', condition: 'llamada.id_llamada = a.llamada'},
        {entity: Mensaje, name: 'mensaje', condition: 'mensaje.id_mensaje = a.mensaje'},
        {entity: Usuario, name: 'usuario', condition: 'mensaje.usuario = usuario.id_usuario or llamada.usuario = usuario.id_usuario'}
        ], alias, 'map');
    const alertas = await queryBuilder.select('a.id_alerta, a.fecha, a.destinatario, a.llamada')
      .where(`date(a.fecha) = date(NOW()) 
      and day(a.fecha) = day(NOW()) 
      and hour(a.fecha) = hour(NOW())
      and minute(a.fecha) = minute(NOW())
      and a.estado = 'PROGRAMADA'
      AND ((a.tipo = 'LLAMADA' AND a.llamada is not null) or (a.tipo = 'MENSAJE' and a.mensaje is not null))`
      )
      .getMany();
    await CallChecker.sendPlivoMessages(alertas.filter(a => a.mensaje))
    await CallChecker.makePlivoCalls(alertas.filter(a => a.llamada));
  }

  static async sendPlivoMessages(alertas: Alerta[]) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const alertaRepository = new BaseRepository(connection, Alerta);
    for (const alerta of alertas) {
      await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
      await mensajeRepository.patch(alerta.mensaje as number, {last_update: new Date()});
      const usuario = (alerta.mensaje as Mensaje).usuario  as Usuario
      const codPais = usuario.cod_pais
      functions.logger.log("should send a message to " + codPais + alerta.destinatario)

      await plivoService.sendMessage({
        source: '111111111',
        destination: codPais + alerta.destinatario!,
        message: (alerta.mensaje as Mensaje).texto
      })
    }
  }

  static async makePlivoCalls(alertas: Alerta[]) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const alertaRepository = new BaseRepository(connection, Alerta);
    for (const alerta of alertas) {
      await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
      await llamadaRepository.patch(alerta.llamada as number, {last_update: new Date()});
      const usuario = (alerta.llamada as Llamada).usuario  as Usuario
      const codPais = usuario.cod_pais;
      functions.logger.log("should call " + codPais + alerta.destinatario)
      await plivoService.call({
        source: '111111111',
        destination: codPais + alerta.destinatario!,
        xml: (alerta.llamada as Llamada).storageUrl
      })
    }
  }

}
