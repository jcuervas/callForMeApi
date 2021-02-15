import {BorradosController} from "./borrados.controller";
import useSecurity from "../../../services/useSecurity";
const express = require('express');

export class BorradosRoutes {
    path = '/borrados';

    constructor(private app: any, private controller: BorradosController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(useSecurity.checkIfAuthenticated)
        router.get('/', this.controller.get);
        this.app.use(this.path, router)
    }
}
