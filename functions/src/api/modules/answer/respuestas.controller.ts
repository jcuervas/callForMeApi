import {connect} from "../../../services/connection";
import {Answer} from "../../../entity/answer";
import {BaseRepository} from "../../../repository/repository";
import useStorage from "../../../services/useStorage";

export class RespuestasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Answer);
    const {alerta, usuario, estado} = req.query;
    let respuestas: Answer | Answer[] | null;
    if (alerta || usuario || estado) {
      respuestas = await respuestaRepository.findByQuery({
        query: {alerta, usuario, estado}
      })
    } else {
      respuestas = await respuestaRepository.findAll();
    }
    if (!respuestas) return res.status(404);
    return res.json({respuestas});
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Answer);
    const respuesta = new Answer(req.body);
    return res.json(await respuestaRepository.create(respuesta));
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Answer);
    const respuesta = new Answer({id_respuesta: req.params.id, ...req.body});
    return res.json(await respuestaRepository.update(respuesta));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const respuestaRepository = new BaseRepository(connection, Answer);
    return res.json(await respuestaRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();

    const respuestaRepository = new BaseRepository(connection, Answer);
    const id = req.params.id;
    const respuesta = await respuestaRepository.findById(id);
    // todo delete audio_url from bucket
    await useStorage.deleteObjectFromBucket(respuesta.audio_url.split('/')[1]);
    await respuestaRepository.delete(id);
    return res.send();
  }
}