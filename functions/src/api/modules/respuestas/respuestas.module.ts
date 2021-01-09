import {RespuestasController} from "./respuestas.controller";
import {RespuestasRoutes} from "./respuestas.routes";

export class RespuestasModule {

  constructor(app: any) {
    new RespuestasRoutes(app, new RespuestasController());
  }
}
