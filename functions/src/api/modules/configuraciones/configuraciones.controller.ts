import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Configuracion} from "../../../entity/configuracion";

export class ConfiguracionesController {

    async get(req: any, res: any) {
        const connection = await connect();
        const configuracionBaseRepository = new BaseRepository(connection, Configuracion);
        const {usuario, last_update} = req.query;
        let configuraciones: Configuracion|Configuracion[]|null = null;
        if (usuario || last_update) {
            configuraciones = await configuracionBaseRepository.findByQuery({usuario, last_update})
        }
        if (!configuraciones) return res.status(404);
        return res.json({configuraciones});
    }

    async patch(req: any, res: any) {
        const connection = await connect();
        const configuracionBaseRepository = new BaseRepository(connection, Configuracion);
        return res.json(await configuracionBaseRepository.patch(req.params.id, req.body.configuracion));
    }

}
