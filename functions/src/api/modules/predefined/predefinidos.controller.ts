import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Predefined} from "../../../entity/predefined";

export class PredefinidosController {

  async get(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    const {usuario, nombre, tipo} = req.query;
    let predefinidos: Predefined | Predefined[] | null;
    if (usuario || nombre || tipo) {
      predefinidos = await predefinidoBaseRepository.findByQuery({
        query: {usuario, nombre, tipo}
      })
    } else {
      predefinidos = await predefinidoBaseRepository.findAll();
    }
    if (!predefinidos) return res.status(404);
    return res.json({predefinidos});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    const {id} = req.params;
    const predefinido: Predefined = await predefinidoBaseRepository.findById(id);
    if (!predefinido) return res.status(404);
    return res.json({predefinido});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    const predefinido = new Predefined(req.body);
    return res.json(await predefinidoBaseRepository.create(predefinido));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    const predefinido = new Predefined({id_predefinido: req.params.id, ...req.body});
    return res.json(await predefinidoBaseRepository.update(predefinido));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    return res.json(await predefinidoBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const predefinidoBaseRepository = new BaseRepository(connection, Predefined);
    const id = req.params.id;
    await predefinidoBaseRepository.delete(id);
    return res.send();
  }
}
