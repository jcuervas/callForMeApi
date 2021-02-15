import {AlertasController} from "./alertas.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class AlertasRoutes {
    path = '/alertas';

    constructor(private app: any, private controller: AlertasController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(useSecurity.checkIfAuthenticated)
        router.get('/:id', this.controller.getById);
        router.get('/', this.controller.get);
        router.post('/', this.controller.post);
        router.put('/:id', this.controller.put);
        router.patch('/:id', this.controller.patch);
        router.delete('/:id', this.controller.delete);
        this.app.use(this.path, router)
    }
}
