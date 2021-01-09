import {checkIfAuthenticated} from "../../../services/security.service";
import {BorradosController} from "./borrados.controller";
const express = require('express');

export class BorradosRoutes {
    path = '/borrados';

    constructor(private app: any, private controller: BorradosController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(checkIfAuthenticated)
        router.get('/', this.controller.get);
        this.app.use(this.path, router)
    }
}
