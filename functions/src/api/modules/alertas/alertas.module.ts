import {AlertasController} from "./alertas.controller";
import {AlertasRoutes} from "./alertas.routes";


export class AlertasModule {

    constructor(app: any) {
        new AlertasRoutes(app, new AlertasController());
    }
}
