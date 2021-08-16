import {connect} from "../../../services/connection";
import {Alert} from "../../../entity/alert";
import {BaseRepository} from "../../../repository/repository";
import {Event} from "../../../entity/event";
import {MAX_ALERTAS} from "../../../entity/message";
import {v4 as uuidv4} from "uuid";
import {Reminder} from "../../../entity/recordatorio";
import util from "../../../util/util";
import {isBefore} from "date-fns";

export class EventosController {

  async get(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Event);
    const {usuario} = req.query;
    let eventos: Event[];
    if (usuario) {
      eventos = (await eventoBaseRepository.findByQuery({query: {usuario},
      manyRelations: [
        {entity: Alert, name: 'alerta', condition: 'alerta.evento = e.id_evento'},
        {entity: Reminder, name: 'recordatorio', condition: 'alerta.id_alerta = recordatorio.alerta'}
        ],
      alias: 'e'})) as Event[];
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
    const eventoBaseRepository = new BaseRepository(connection, Event);
    const {id} = req.params;
    let eventos: Event | Event[];
    eventos = await eventoBaseRepository.findById(id);

    return res.json({eventos});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Event);
    const alertaRepository = new BaseRepository(connection, Alert);
    const recordatorioRepository = new BaseRepository(connection, Reminder);
    const evento = new Event(req.body);
    await eventoBaseRepository.create(evento);

    let maxAlerts = 0;
    let fechaFin: Date | null = null;
    if (evento.unidad_repeticion && evento.cantidad_repeticion && evento.fecha_fin) {
      fechaFin = evento.fecha_fin;
    }
    let fechaAlerta = evento.fecha_ini;
    while (maxAlerts < MAX_ALERTAS) {
      const alerta = await alertaRepository.create(new Alert({
        tipo: "EVENTO",
        fecha: fechaAlerta,
        evento: evento.id_evento,
        num_intentos: 0,
        estado: 'PROGRAMADA',
        destinatario: null,
        uuid: uuidv4()
      }));
      const recordatorio = await recordatorioRepository.create(new Reminder({
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
    const eventoBaseRepository = new BaseRepository(connection, Event);
    const evento = new Event(req.body);
    return res.json(await eventoBaseRepository.update(evento));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Event);
    return res.json(await eventoBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Event);
    const id = req.params.id;
    await eventoBaseRepository.delete(id);
    return res.send();
  }
}