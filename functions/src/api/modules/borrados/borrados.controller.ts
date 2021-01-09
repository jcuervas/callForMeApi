import {connect} from "../../../services/connection";
import {Borrado} from "../../../entity/borrado";
import {BaseRepository} from "../../../repository/repository";

export class BorradosController {

    async get(req: any, res: any) {
        const connection = await connect();
        const borradosRepository = new BaseRepository(connection, Borrado);
        const {tabla, usuario, fecha} = req.query;
        let borrados: Borrado|Borrado[]|null = null;
        if (tabla || usuario || fecha) {
            borrados = await borradosRepository.findByQuery({tabla, usuario, fecha})
        }
        if (!borrados) return res.status(404);
        return res.json({borrados});
    }
}
