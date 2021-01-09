import {connect} from "../../../services/connection";
import {Mensaje} from "../../../entity/mensaje";
import {BaseRepository} from "../../../repository/repository";

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

    async getPlivoRecord(req: any, res: any) {
       /* const connection = await connect();
        const mensajeRepository = new BaseRepository(connection, Mensaje);
        const idAlerta = req.params.idAlerta;
        const recordUrl = req.query.RecordUrl;

        const callUUID: string = null;
        const callStatus: string = null;
        const destinatario: string = null;
        const recordingUrlPlivo: string = null;
        const recordingDuration = 0;

        if (recordUrl) {
            callUUID = req.query.CallUUID;
            callStatus = req.query.CallStatus;
            recordingUrlPlivo = req.query.RecordUrl;
            destinatario = req.query.To;
        }

        const urlPropia = recordingUrlPlivo && StorageService


        const results = await mensajeRepository.findById(idAlerta);*/
        return res.status(200).send("ok");
    }

    async postPlivoMessageAnswer(req: any, res: any) {
        return res.status(200).send("ok");

    }

}
