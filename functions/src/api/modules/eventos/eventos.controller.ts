import {connect} from "../../../services/connection";
import {Alerta} from "../../../entity/alerta";
import {BaseRepository} from "../../../repository/repository";
import {Evento} from "../../../entity/evento";
import {MAX_ALERTAS} from "../../../entity/mensaje";
import {v4 as uuidv4} from "uuid";
import {Recordatorio} from "../../../entity/recordatorio";
import util from "../../../util/util";
import {isBefore} from "date-fns";

export class EventosController {

  async get(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const {usuario} = req.query;
    let eventos: Evento[];
    if (usuario) {
      eventos = (await eventoBaseRepository.findByQuery({query: {usuario},
      manyRelations: [
        {entity: Alerta, name: 'alerta', condition: 'alerta.evento = e.id_evento'},
        {entity: Recordatorio, name: 'recordatorio', condition: 'alerta.id_alerta = recordatorio.alerta'}
        ],
      alias: 'e'})) as Evento[];
    } else {
      eventos = await eventoBaseRepository.findAll();
    }
    eventos = eventos.map(e => {
      e.populateAlertasWithId();
      return e;
    })
    return res.json({eventos});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const {id} = req.params;
    let eventos: Evento | Evento[];
    eventos = await eventoBaseRepository.findById(id);

    return res.json({eventos});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const alertaRepository = new BaseRepository(connection, Alerta);
    const recordatorioRepository = new BaseRepository(connection, Recordatorio);
    const evento = new Evento(req.body);
    await eventoBaseRepository.create(evento);

    let maxAlerts = 0;
    let fechaFin: Date | null = null;
    if (evento.unidad_repeticion && evento.cantidad_repeticion && evento.fecha_fin) {
      fechaFin = evento.fecha_fin;
    }
    let fechaAlerta = evento.fecha_ini;
    while (maxAlerts < MAX_ALERTAS) {
      const alerta = await alertaRepository.create(new Alerta({
        tipo: "EVENTO",
        fecha: fechaAlerta,
        evento: evento.id_evento,
        num_intentos: 0,
        estado: 'PROGRAMADA',
        destinatario: null,
        uuid: uuidv4()
      }));
      const recordatorio = await recordatorioRepository.create(new Recordatorio({
        tipo: "ALARMA",
        tiempo_offset: req.query.tiempo_offset || 0,
        alerta: alerta.id_alerta
      }));
      if (!evento.alertas) evento.alertas = [];
      if (!alerta.recordatorios) alerta.recordatorios = [];
      alerta.recordatorios.push(recordatorio);
      evento.alertas.push(alerta);
      if (fechaFin) {
        fechaAlerta = util.getNextDate(fechaAlerta, evento.cantidad_repeticion!, evento.unidad_repeticion!, 0);
        if (!isBefore(fechaAlerta, fechaFin)) {
          break;
        }
      } else {
        break;
      }
      maxAlerts++;
    }
    evento.populateAlertasWithId();
    return res.json(evento);
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const evento = new Evento(req.body);
    return res.json(await eventoBaseRepository.update(evento));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    return res.json(await eventoBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const id = req.params.id;
    await eventoBaseRepository.delete(id);
    return res.send();
  }
}
