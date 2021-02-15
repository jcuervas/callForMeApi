import {connect} from "../../../services/connection";
import {Respuesta} from "../../../entity/respuesta";
import {BaseRepository} from "../../../repository/repository";
import useStorage from "../../../services/useStorage";

export class RespuestasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    const {alerta, usuario, estado, last_update} = req.query;
    let respuestas: Respuesta | Respuesta[] | null;
    if (alerta || usuario || estado || last_update) {
      respuestas = await respuestaRepository.findByQuery({alerta, usuario, estado, last_update})
    } else {
      respuestas = await respuestaRepository.findAll();
    }
    if (!respuestas) return res.status(404);
    return res.json({respuestas});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    const respuesta = new Respuesta(req.body.respuesta);
    return res.json(await respuestaRepository.create(respuesta));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    const respuesta = new Respuesta({id_respuesta: req.params.id, ...req.body.respuesta});
    return res.json(await respuestaRepository.update(respuesta));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    return res.json(await respuestaRepository.patch(req.params.id, req.body.respuesta));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const respuestaRepository = new BaseRepository(connection, Respuesta);
    const id = req.params.id;
    const respuesta = await respuestaRepository.findById(id);
    // todo delete audio_url from bucket
    await useStorage.deleteObjectFromBucket(respuesta.audio_url.split('/')[1]);
    await respuestaRepository.delete(id);
    return res.send();
  }
}
