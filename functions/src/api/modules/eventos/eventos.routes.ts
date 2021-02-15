import {EventosController} from "./eventos.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class EventosRoutes {
  path = '/Eventos';

  constructor(private app: any, private controller: EventosController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    const router = express.Router();
    router.use(useSecurity.checkIfAuthenticated)
    router.get('/', this.controller.get);
    router.get('/:id', this.controller.get);
    router.post('/', this.controller.post);
    router.put('/:id', this.controller.put);
    router.patch('/:id_', this.controller.patch);
    router.delete('/:id', this.controller.delete);
    this.app.use(this.path, router)
  }
}
