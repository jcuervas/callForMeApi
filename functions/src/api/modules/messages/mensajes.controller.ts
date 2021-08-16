import {connect} from "../../../services/connection";
import {MAX_ALERTAS, Message} from "../../../entity/message";
import {BaseRepository} from "../../../repository/repository";
import {Alert} from "../../../entity/alert";
import {OFFSET, Reminder} from "../../../entity/recordatorio";
import util from "../../../util/util";
import {isBefore} from "date-fns";
import {Borrado} from "../../../entity/borrado";
import {v4 as uuidv4} from 'uuid';

export class MensajesController {

  async get(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const {usuario, evento} = req.query;
    const alias = 'm'
    const queryBuilder = mensajeRepository.getQueryBuilder(alias);
    mensajeRepository.andWhere(queryBuilder, {usuario, evento}, alias);
    mensajeRepository.joinManyRelations(queryBuilder,
      [{entity: Alert, name: 'alertas', condition: `${alias}.id_mensaje = alertas.mensaje`}], alias);
    let mensajes = await queryBuilder.getMany();
    mensajes = mensajes.map(m => {
      m.populateAlertasWithId();
      return m;
    })
    return res.json({mensajes});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const mensaje = await mensajeRepository.findById(req.params.id);
    if (!mensaje) return res.status(404);
    return res.json({mensaje});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const alertaRepository = new BaseRepository(connection, Alert);
    const recordatorioRepository = new BaseRepository(connection, Reminder);
    const mensaje = new Message(req.body);
    await mensajeRepository.create(mensaje);
    let maxAlerts = 0;
    let fechaFin: Date | null = null;
    if (mensaje.unidad_repeticion && mensaje.cantidad_repeticion && mensaje.fecha_fin) {
      fechaFin = mensaje.fecha_fin;
    }
    let fechaAlerta = mensaje.fecha_ini;
    while (maxAlerts < MAX_ALERTAS) {
      const alerta = await alertaRepository.create(new Alert({
        tipo: "MENSAJE",
        fecha: fechaAlerta,
        mensaje: mensaje.id_mensaje,
        num_intentos: 0,
        estado: 'PROGRAMADA',
        destinatario: mensaje.destinatario,
        uuid: uuidv4()
      }));
      const recordatorio = new Reminder({
        tipo: "ALARMA",
        tiempo_offset: mensaje.tipo === 'CHAT' ? 0 : OFFSET.mensaje.negative,
        alerta: alerta.id_alerta
      });
      await recordatorioRepository.create(recordatorio);
      if (!mensaje.alerts) mensaje.alerts = [];
      if (!alerta.recordatorios) alerta.recordatorios = [];
      alerta.recordatorios?.push(recordatorio);
      mensaje.alerts.push(alerta);
      if (fechaFin) {
        fechaAlerta = util.getNextDate(fechaAlerta, mensaje.cantidad_repeticion!, mensaje.unidad_repeticion!, 0);
        if (!isBefore(fechaAlerta, fechaFin)) {
          break;
        }
      } else {
        break;
      }
      maxAlerts++;
    }
    mensaje.populateAlertasWithId();
    return res.json(mensaje);
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const mensaje = new Message({id_mensaje: req.params.id, ...req.body});
    return res.json(await mensajeRepository.update(mensaje));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    return res.json(await mensajeRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const mensajeRepository = new BaseRepository(connection, Message);
    const borradosRepository = new BaseRepository(connection, Borrado);
    const id = req.params.id;
    const mensaje = await mensajeRepository.findById(id);
    await borradosRepository.create(new Borrado({
      tabla: 'Mensajes',
      usuario: mensaje.usuario,
      id_elemento: mensaje.id_mensaje
    }));
    await mensajeRepository.delete(id);
    return res.send();
  }
}
