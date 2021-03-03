import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Alerta} from "../../../entity/alerta";

export class AlertasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alerta);
    const {usuario, last_update} = req.query;
    let alertas: Alerta | Alerta[];
    if (usuario || last_update) {
      alertas = await alertaBaseRepository.findByQuery({usuario, last_update})
    } else {
      alertas = await alertaBaseRepository.findAll();
    }
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
