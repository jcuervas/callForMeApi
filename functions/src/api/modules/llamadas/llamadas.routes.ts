import {checkIfAuthenticated} from "../../../services/security.service";
import {LlamadasController} from "./llamadas.controller";
const express = require('express');

export class LlamadasRoutes {
    path = '/Llamadas';

    constructor(private app: any, private controller: LlamadasController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(checkIfAuthenticated)
        router.get('/', this.controller.get);
        router.get('/:id', this.controller.getById);
        router.post('/', this.controller.post);
        router.put('/:id', this.controller.put);
        router.patch('/:id', this.controller.patch);
        router.delete('/:id', this.controller.delete);
        this.app.use(this.path, router)
    }
}
