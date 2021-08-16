import {EventosController} from "./eventos.controller";
import {EventosRoutes} from "./eventos.routes";

export class EventosModule {

    constructor(app: any) {
        new EventosRoutes(app, new EventosController());
    }
}
