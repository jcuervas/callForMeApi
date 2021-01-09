import {ConfiguracionesController} from "./configuraciones.controller";
import {ConfiguracionesRoutes} from "./configuraciones.routes";

export class ConfiguracionesModule {

    constructor(app: any) {
        new ConfiguracionesRoutes(app, new ConfiguracionesController());
    }
}
