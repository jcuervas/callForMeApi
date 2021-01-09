import {PlivoController} from "./plivo.controller";

export class PlivoRoutes {
  answer = '/PlivoAnswer';
  messageAnswer = '/PlivoMessageAnswer';
  call = '/PlivoCall';
  record = '/PlivoRecord';

  constructor(private app: any, private controller: PlivoController) {
    this.setupRoutes()
  }

  private setupRoutes() {
    this.app.get(this.answer + '/:idAlerta', this.controller.getPlivoAnswer);
    this.app.get(this.call + '/:idAlerta', this.controller.getPlivoCall);
    this.app.get(this.record + '/:idAlerta', this.controller.getPlivoRecord);
    this.app.post(this.messageAnswer + '/:idAlerta', this.controller.postPlivoMessageAnswer);
  }
}
