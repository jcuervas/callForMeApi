import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Predefinido} from "../../../entity/predefinido";

export class PredefinidosController {

  async get(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    const {usuario, nombre, last_update, tipo} = req.query;
    let predefinidos: Predefinido | Predefinido[] | null = null;
    if (usuario || nombre || last_update || tipo) {
      predefinidos = await predefinidoBaseRepository.findByQuery({usuario, nombre, last_update, tipo})
    } else {
      predefinidos = await predefinidoBaseRepository.findAll();
    }
    if (!predefinidos) return res.status(404);
    return res.json({predefinidos});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    const {id} = req.params;
    const predefinido: Predefinido = await predefinidoBaseRepository.findById(id);
    if (!predefinido) return res.status(404);
    return res.json({predefinido});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    const predefinido = new Predefinido(req.body.predefinido);
    return res.json(await predefinidoBaseRepository.create(predefinido));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    const predefinido = new Predefinido({id_predefinido: req.params.id, ...req.body.predefinido});
    return res.json(await predefinidoBaseRepository.update(predefinido));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    return res.json(await predefinidoBaseRepository.patch(req.params.id, req.body.predefinido));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const predefinidoBaseRepository = new BaseRepository(connection, Predefinido);
    const id = req.params.id;
    await predefinidoBaseRepository.delete(id);
    return res.send();
  }
}
