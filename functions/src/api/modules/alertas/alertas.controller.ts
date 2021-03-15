import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Alerta} from "../../../entity/alerta";
import {Evento} from "../../../entity/evento";
import {Llamada} from "../../../entity/llamada";
import {Mensaje} from "../../../entity/mensaje";

export class AlertasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const {usuario, last_update} = req.query;
    let alertas: Alerta | Alerta[];
    if (usuario || last_update) {
      const queryBuilder = alertaBaseRepository.getQueryBuilder('a');
      alertaBaseRepository.joinSingleRelations(queryBuilder,
        [
          {entity: Evento, name: 'evento', condition: 'a.evento = evento.id_evento'},
          {entity: Llamada, name: 'llamada', condition: 'a.llamada = llamada.id_llamada'},
          {entity: Mensaje, name: 'mensaje', condition: 'a.mensaje = mensaje.id_mensaje'}
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
      a.mensaje = (a.mensaje as Mensaje)?.id_mensaje!;
      a.llamada = (a.llamada as Llamada)?.id_llamada!;
      a.evento = (a.evento as Evento)?.id_evento!;
      return a;
    })
    return res.json({alertas});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const {id} = req.params;
    let alerta: Alerta;
    alerta = await alertaBaseRepository.findById(id);
    return res.json({alerta});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const alerta = new Alerta(req.body);
    return res.json(await alertaBaseRepository.create(alerta));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const alerta = new Alerta(req.body);
    return res.json(await alertaBaseRepository.update(alerta));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    return res.json(await alertaBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const id_alerta = req.params.id_alerta;
    await alertaBaseRepository.delete(id_alerta);
    return res.send();
  }
}
