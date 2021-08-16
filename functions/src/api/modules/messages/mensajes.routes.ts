import {MensajesController} from "./mensajes.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class MensajesRoutes {
  path = '/mensajes';

  constructor(private app: any, private controller: MensajesController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    const router = express.Router();
    router.use(useSecurity.checkIfAuthenticated)
    router.get('/', this.controller.get);
    router.get('/:id', this.controller.getById);
    router.post('/', this.controller.post);
    router.put('/:id', this.controller.put);
    router.patch('/:id', this.controller.patch);
    router.delete('/:id', this.controller.delete);
    this.app.use(this.path, router)
  }
}