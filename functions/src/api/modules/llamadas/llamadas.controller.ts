import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Llamada} from "../../../entity/llamada";
import {Borrado} from "../../../entity/borrado";

export class LlamadasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const {usuario, llamada, last_update} = req.query;
    let llamadas: Llamada | Llamada[];
    if (usuario || llamada || last_update) {
      llamadas = await llamadaRepository.findByQuery({usuario, last_update})
    } else {
      llamadas = await llamadaRepository.findAll();
    }
    return res.json({llamadas});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const {id} = req.params;
    console.log({id, params: req.params});
    let llamada: Llamada;
    llamada = await llamadaRepository.findById(id);
    return res.json({llamada});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const llamada = new Llamada(req.body);
    return res.json(await llamadaRepository.create(llamada));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const llamada = new Llamada(req.body);
    return res.json(await llamadaRepository.update(llamada));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    return res.json(await llamadaRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const borradosRepository = new BaseRepository(connection, Borrado);
    const id = req.params.id;
    const llamada = await llamadaRepository.findById(id);
    await llamadaRepository.delete(id);
    await borradosRepository.create(new Borrado({
      tabla: 'Llamadas',
      usuario: llamada.usuario,
      id_elemento: id,
      fecha: new Date()
    }))
    return res.send();
  }
}
