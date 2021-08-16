import {MensajesController} from "./mensajes.controller";
import {MensajesRoutes} from "./mensajes.routes";

export class MensajesModule {

    constructor(app: any) {
        new MensajesRoutes(app, new MensajesController());
    }
}
