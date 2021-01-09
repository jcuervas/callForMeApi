import {checkIfAuthenticated} from "../../../services/security.service";
import {ConfiguracionesController} from "./configuraciones.controller";
const express = require('express');

export class ConfiguracionesRoutes {
    path = '/configuraciones';

    constructor(private app: any, private controller: ConfiguracionesController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(checkIfAuthenticated)
        router.get('/', this.controller.get);
        router.patch('/:id', this.controller.patch);
        this.app.use(this.path, router)
    }
}
