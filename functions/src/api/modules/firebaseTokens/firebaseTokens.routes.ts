import {FirebaseTokensController} from "./firebaseTokens.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class FirebaseTokensRoutes {
  path = '/firebaseTokens';

  constructor(private app: any, private controller: FirebaseTokensController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    const router = express.Router();
    this.app.get(this.path, this.controller.get);
    this.app.post(this.path, this.controller.post);
    router.use(useSecurity.checkIfAuthenticated)
    router.put('/:device', this.controller.put);
    router.patch('/:device', this.controller.patch);
    router.delete('/:device', this.controller.delete);
    this.app.use(this.path, router)
  }
}
