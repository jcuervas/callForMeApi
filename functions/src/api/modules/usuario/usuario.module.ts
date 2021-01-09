import {UsuarioController} from "./usuario.controller";
import {UsuarioRoutes} from "./usuario.routes";

export class UsuariosModule {

  constructor(app: any) {
    new UsuarioRoutes(app, new UsuarioController());
  }
}
