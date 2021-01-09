import {checkIfAuthenticated} from "../../../services/security.service";
import {RespuestasController} from "./respuestas.controller";
const express = require('express');

export class RespuestasRoutes {
    path = '/respuestas';

    constructor(private app: any, private controller: RespuestasController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(checkIfAuthenticated)
        router.get('/', this.controller.get);
        router.post('/', this.controller.post);
        router.put('/:id', this.controller.put);
        router.patch('/:id', this.controller.patch);
        router.delete('/:id', this.controller.delete);
        this.app.use(this.path, router)
    }
}
