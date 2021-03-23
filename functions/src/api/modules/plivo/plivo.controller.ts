import {connect} from "../../../services/connection";
import {Mensaje} from "../../../entity/mensaje";
import {BaseRepository} from "../../../repository/repository";
import {Llamada} from "../../../entity/llamada";
import {Alerta} from "../../../entity/alerta";
import {Respuesta} from "../../../entity/respuesta";

export class PlivoController {

  async getPlivoAnswer(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const id = req.params.id;
    const results = await mensajeRepository.findById(id);
    return res.json(results);
  }

  async getPlivoCall(req: any, res: any) {
    const connection = await connect();
    const mensajeRepository = new BaseRepository(connection, Mensaje);
    const id = req.params.id;
    const results = await mensajeRepository.findById(id);
    return res.json(results);
  }

  async postPlivoRecord(req: any, res: any) {
    const connection = await connect();
    const alertaRepository = new BaseRepository(connection, Alerta);
    const respuestaRepository = new BaseRepository(connection, Respuesta);
    const idAlerta = req.params.idAlerta;
    const alerta = await alertaRepository.findById(idAlerta);
    const llamada = alerta.llamada as Llamada;
    if (!llamada) {
      return res.status(400).send("Esta alerta no tiene llamada asignada");
    }
    const {RecordUrl, CallUUID, CallStatus, RecordingDuration, To} = req.query;
    console.log({CallUUID, CallStatus})
    const respuesta = new Respuesta({
      audio_url: RecordUrl,
      texto: '',
      estado: 'NOT_LISTENED',
      destinatario: To,
      alerta: alerta.id_alerta,
      usuario: llamada.usuario,
      duracion: RecordingDuration
    })
    await respuestaRepository.create(respuesta);
    return res.status(200).send("ok");
  }

  async postPlivoMessageAnswer(req: any, res: any) {
    return res.status(200).send("ok");

  }

}
