import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Alert} from "../../../entity/alert";
import {Event} from "../../../entity/event";
import {Call} from "../../../entity/call";
import {Message} from "../../../entity/message";
import {Controller} from "@nestjs/common";

@Controller('alerts')
export class AlertController {

  async get(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const {usuario, last_update} = req.query;
    let alertas: Alert | Alert[];
    if (usuario || last_update) {
      const queryBuilder = alertaBaseRepository.getQueryBuilder('a');
      alertaBaseRepository.joinSingleRelations(queryBuilder,
        [
          {entity: Event, name: 'evento', condition: 'a.evento = evento.id_evento'},
          {entity: Call, name: 'llamada', condition: 'a.llamada = llamada.id_llamada'},
          {entity: Message, name: 'mensaje', condition: 'a.mensaje = mensaje.id_mensaje'}
        ], 'a', 'select');
      queryBuilder.orWhere('evento.usuario = :usuario')
        .orWhere('llamada.usuario = :usuario')
        .orWhere('mensaje.usuario = :usuario');
      queryBuilder.setParameter('usuario', usuario)
      alertas = await queryBuilder.getMany();
    } else {
      alertas = await alertaBaseRepository.findAll();
    }
    alertas = alertas.map(a => {
      a.mensaje = (a.mensaje as Message)?.id_mensaje!;
      a.llamada = (a.llamada as Call)?.id_llamada!;
      a.evento = (a.evento as Event)?.id_evento!;
      return a;
    })
    return res.json({alertas});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const {id} = req.params;
    let alerta: Alert;
    alerta = await alertaBaseRepository.findById(id);
    return res.json({alerta});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const alerta = new Alert(req.body);
    return res.json(await alertaBaseRepository.create(alerta));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const alerta = new Alert(req.body);
    return res.json(await alertaBaseRepository.update(alerta));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    return res.json(await alertaBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const id_alerta = req.params.id_alerta;
    await alertaBaseRepository.delete(id_alerta);
    return res.send();
  }
}
