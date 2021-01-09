import {connect} from "../../../services/connection";
import {Alerta} from "../../../entity/alerta";
import {BaseRepository} from "../../../repository/repository";
import {Evento} from "../../../entity/evento";

export class EventosController {

  async get(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const {tipo, evento, llamada, mensaje} = req.query;
    let eventos: Evento | Evento[];
    if (tipo || evento || llamada || mensaje) {
      eventos = await eventoBaseRepository.findByQuery({tipo, evento, llamada, mensaje})
    } else {
      eventos = await eventoBaseRepository.findAll();
    }
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
    const alerta = new Alerta(req.body.evento);
    return res.json(await eventoBaseRepository.create(alerta));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const alerta = new Alerta(req.body.evento);
    return res.json(await eventoBaseRepository.update(alerta));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    return res.json(await eventoBaseRepository.patch(req.params.id, req.body.evento));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const eventoBaseRepository = new BaseRepository(connection, Evento);
    const id = req.params.id;
    await eventoBaseRepository.delete(id);
    return res.send();
  }
}
