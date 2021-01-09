import {connect} from "../../../services/connection";
import {Respuesta} from "../../../entity/respuesta";
import {BaseRepository} from "../../../repository/repository";
import {Usuario} from "../../../entity/usuario";

export class UsuarioController {

    async get(req: any, res: any) {
        const connection = await connect();
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const {tipo, evento, llamada, mensaje, username} = req.query;
        let usuarios: Usuario|Usuario[];
        if (tipo || evento || llamada || mensaje || username) {
            usuarios = await usuarioRepository.findByQuery({tipo, evento, llamada, mensaje, username})
        } else {
            usuarios = await usuarioRepository.findAll();
        }
        return res.json({usuarios});
    }

    async getById(req: any, res: any) {
        console.log({params: req.params});
        const connection = await connect();
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const {id} = req.params;
        let results: Usuario;
        results = await usuarioRepository.findById(id);
        return res.json(results);
    }

    async post(req: any, res: any) {
        const connection = await connect();
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const usuario = new Usuario(req.body);
        return res.json(await usuarioRepository.create(usuario));
    }

    async put(req: any, res: any) {
        const connection = await connect();
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const usuario = new Usuario(req.body);
        return res.json(await usuarioRepository.update(usuario));
    }

    async patch(req: any, res: any) {
        const connection = await connect();
        const respuestaRepository = new BaseRepository(connection, Respuesta);
        return res.json(await respuestaRepository.patch(req.params.id_respuesta, req.body));
    }

    async delete(req: any, res: any) {
        const connection = await connect();
        const usuarioRepository = new BaseRepository(connection, Usuario);
        const id_respuesta = req.params.id_respuesta;
        await usuarioRepository.delete(id_respuesta);
        return res.send();
    }
}
