import {checkIfAuthenticated} from "../../../services/security.service";
import {FirebaseTokensController} from "./firebaseTokens.controller";
const express = require('express');

export class FirebaseTokensRoutes {
  path = '/Firebasetokens';

  constructor(private app: any, private controller: FirebaseTokensController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    const router = express.Router();
    router.use(checkIfAuthenticated)
    router.get('/', this.controller.get);
    router.get('/:device', this.controller.get);
    router.post('/', this.controller.post);
    router.put('/:device', this.controller.put);
    router.patch('/:device', this.controller.patch);
    router.delete('/:device', this.controller.delete);
    this.app.use(this.path, router)
  }
}
