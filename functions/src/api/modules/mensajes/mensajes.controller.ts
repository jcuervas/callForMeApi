import {connect} from "../../../services/connection";
import {MAX_ALERTAS, Mensaje} from "../../../entity/mensaje";
import {BaseRepository} from "../../../repository/repository";
import {Alerta} from "../../../entity/alerta";
import {OFFSET, Recordatorio} from "../../../entity/recordatorio";
import util from "../../../util/util";
import {isBefore} from "date-fns";
import {Borrado} from "../../../entity/borrado";

export class MensajesController {

  async get(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const {usuario, evento, last_update} = req.query;
    const mensajes = await mensajeRepository.findByQuery({usuario, evento, last_update});
    return res.json({mensajes});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const mensaje = await mensajeRepository.findById(req.params.id);
    if (!mensaje) return res.status(404);
    return res.json({mensaje});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const alertaRepository = new BaseRepository(connection, Alerta);
    const recordatorioRepository = new BaseRepository(connection, Recordatorio);
    const mensaje = new Mensaje(req.body);
    await mensajeRepository.create(mensaje);
    let maxAlerts = 0;
    let fechaFin: Date | null = null;
    if (mensaje.unidad_repeticion && mensaje.cantidad_repeticion && mensaje.fecha_fin) {
      fechaFin = mensaje.fecha_fin;
    }
    let fechaAlerta = mensaje.fecha_ini;
    while (maxAlerts < MAX_ALERTAS) {
      const alerta = await alertaRepository.create(
        new Alerta({
          tipo: "MENSAJE",
          fecha: fechaAlerta,
          mensaje: mensaje.id_mensaje,
          num_intentos: 0,
          estado: 'PROGRAMADA'
        })
      );
      const recordatorio = new Recordatorio({
        tipo: "ALARMA",
        tiempo_offset: mensaje.tipo === 'CHAT' ? 0 : OFFSET.mensaje.negative,
        alerta: alerta.id_alerta
      });
      await recordatorioRepository.create(recordatorio);
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
    return res.json({message: "ok"});
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const mensaje = new Mensaje({id_mensaje: req.params.id, ...req.body});
    return res.json(await mensajeRepository.update(mensaje));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    return res.json(await mensajeRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const mensajeRepository = new BaseRepository(connection, Mensaje);
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
