import {connect} from "../../../services/connection";
import {Message} from "../../../entity/message";
import {BaseRepository} from "../../../repository/repository";
import {Call} from "../../../entity/call";
import {Alert} from "../../../entity/alert";
import {Answer} from "../../../entity/answer";
import useAxios from "../../../services/useAxios";

export class PlivoController {

  async getPlivoAnswer(req: any, res: any) {
    const connection = await connect();
    const alertaBaseRepository = new BaseRepository(connection, Alert);
    const id = req.params.id;
    const alerta = await alertaBaseRepository.findById(id, {relations: ['llamada']});
    if (!alerta.llamada) return res.status(404)
    const plivoAnswer = await useAxios.get((alerta.llamada as Call).storageUrl)
    return res.send(plivoAnswer);
  }

  async getPlivoCall(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Message);
    const id = req.params.id;
    const results = await mensajeRepository.findById(id);
    return res.json(results);
  }

  async postPlivoRecord(req: any, res: any) {
    const connection = await connect();
    const alertaRepository = new BaseRepository(connection, Alert);
    const respuestaRepository = new BaseRepository(connection, Answer);
    const idAlerta = req.params.idAlerta;
    const alerta = await alertaRepository.findById(idAlerta);
    const llamada = alerta.llamada as Call;
    if (!llamada) {
      return res.status(400).send("Esta alerta no tiene llamada asignada");
    }
    const {RecordUrl, CallUUID, CallStatus, RecordingDuration, To} = req.query;
    console.log({req, CallUUID, CallStatus})
    const respuesta = new Answer({
      audio_url: RecordUrl,
      texto: '',
      estado: 'NOT_LISTENED',
      destinatario: To,
      alerta: alerta.id_alerta,
      usuario: llamada.user,
      duracion: RecordingDuration
    })
    await respuestaRepository.create(respuesta);
    return res.status(200).send("ok");
  }

  async postPlivoMessageAnswer(req: any, res: any) {
    return res.status(200).send("ok");

  }

}
