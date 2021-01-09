import {AuthController} from "./auth.controller";
const express = require('express');

export class AuthRoutes {
    path = '/auth';

    constructor(private app: any, private controller: AuthController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.post('/', this.controller.login);
        this.app.use(this.path, router)
    }
}
