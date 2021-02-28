import useSecurity from "../../../services/useSecurity";
import {StripeController} from "./stripe.controller";
const express = require('express');


export class StripeRoutes {
    path = '/stripe';

    constructor(private app: any, private controller: StripeController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const router = express.Router();
        router.use(useSecurity.checkIfAuthenticated)
        router.post('/ephemeral_keys', this.controller.ephemeralKeys);
        router.post('/charge', this.controller.charge);
        this.app.use(this.path, router)
    }
}
