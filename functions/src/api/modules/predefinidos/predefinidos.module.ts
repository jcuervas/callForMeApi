import {PredefinidosController} from "./predefinidos.controller";
import {PredefinidosRoutes} from "./predefinidos.routes";


export class PredefinidosModule {

  constructor(app: any) {
    new PredefinidosRoutes(app, new PredefinidosController());
  }
}
