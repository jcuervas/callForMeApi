import {Controller, Get, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {connect} from "src/services/connection";
import {BaseRepository} from "src/repository/repository";
import {User} from "src/entity/user";
import adminSdk from "src/config/adminSdk";

@Controller('user')
export class UserController {

  @Get('me')
  async me(@Req() req: Request, @Res() res: Response) {
    const connection = await connect();
    const userRepository = new BaseRepository(connection, User);
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return res.status(404).json({message: 'User not found'})
    }
    const firebaseUser = await adminSdk.getFirebaseUser(token)
    const user = userRepository.findById(firebaseUser.uid)
    return res.json(user);
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, User);
    const usuario = new User(req.body);
    return res.json(await usuarioRepository.update(usuario));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const usuarioBaseRepository = new BaseRepository(connection, User);
    return res.json(await usuarioBaseRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const usuarioRepository = new BaseRepository(connection, User);
    const {id} = req.params;
    await usuarioRepository.delete(id);
    return res.send();
  }
}
