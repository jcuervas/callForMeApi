import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Configuracion} from "../../../entity/configuracion";
import {Usuario} from "../../../entity/usuario";

export class ConfiguracionesController {

    async get(req: any, res: any) {
        const connection = await connect();
        const configuracionBaseRepository = new BaseRepository(connection, Configuracion);
        const {usuario} = req.query;
        let configuracion: Configuracion|Configuracion[]|null = null;
        if (usuario) {
            configuracion = await configuracionBaseRepository.findOneByQuery({usuario}, {last_update: 'DESC'}, ['usuario']);
        }
        if (!configuracion) return res.status(404);
        configuracion.usuario = (configuracion.usuario as unknown as Usuario).id_usuario
        return res.json(configuracion);
    }

    async patch(req: any, res: any) {
        const connection = await connect();
        const configuracionBaseRepository = new BaseRepository(connection, Configuracion);
        return res.json(await configuracionBaseRepository.patch(req.params.id, req.body));
    }

}
