import {PlivoController} from "./plivo.controller";

export class PlivoRoutes {
  answer = '/PlivoAnswer';
  messageAnswer = '/PlivoMessageAnswer';
  call = '/PlivoCall';
  record = '/plivoRecord';

  constructor(private app: any, private controller: PlivoController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    this.app.get(this.answer + '/:idAlerta', this.controller.getPlivoAnswer);
    this.app.get(this.call + '/:idAlerta', this.controller.getPlivoCall);
    this.app.post(this.record + '/:idAlerta', this.controller.postPlivoRecord);
    this.app.post(this.messageAnswer + '/:idAlerta', this.controller.postPlivoMessageAnswer);
  }
}
