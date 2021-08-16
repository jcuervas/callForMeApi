import {LlamadasController} from "./llamadas.controller";
import {LlamadasRoutes} from "./llamadas.routes";

export class LlamadasModule {

    constructor(app: any) {
        new LlamadasRoutes(app, new LlamadasController());
    }
}
