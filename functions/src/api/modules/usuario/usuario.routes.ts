import {UsuarioController} from "./usuario.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class UsuarioRoutes {
  path = '/usuarios';

  constructor(private app: any, private controller: UsuarioController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    this.app.post(this.path, this.controller.post);
    const router = express.Router();
    router.use(useSecurity.checkIfAuthenticated)
    router.get('/:id', this.controller.getById);
    router.get('/', this.controller.get);
    router.put('/:id', this.controller.put);
    router.post('/sendPin/:id', this.controller.sendPin);
    router.patch('/:id', this.controller.patch);
    router.delete('/:id', this.controller.delete);

    this.app.use(this.path, router)
  }
}
