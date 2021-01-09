import {BorradosController} from "./borrados.controller";
import {BorradosRoutes} from "./borrados.routes";

export class BorradosModule {

    constructor(app: any) {
        new BorradosRoutes(app, new BorradosController());
    }
}
