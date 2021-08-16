import {PlivoController} from "./plivo.controller";
import {CallChecker} from "../../../handlers/callChecker";

export class PlivoRoutes {

  constructor(private app: any, private controller: PlivoController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    this.app.get('/callChecker', CallChecker.requestCall);
    this.app.get('/plivoAnswer/:id', this.controller.getPlivoAnswer);
    this.app.get('/plivoCall/:id', this.controller.getPlivoCall);
    this.app.post('/plivoRecord/:id', this.controller.postPlivoRecord);
    this.app.post('/plivoMessageAnswer/:id', this.controller.postPlivoMessageAnswer);
  }
}
