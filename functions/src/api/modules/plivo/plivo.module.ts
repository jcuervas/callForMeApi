import {PlivoController} from "./plivo.controller";
import {PlivoRoutes} from "./plivo.routes";

export class PlivoModule {

  constructor(app: any) {
    new PlivoRoutes(app, new PlivoController());
  }
}
