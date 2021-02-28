import {StripeController} from "./stripe.controller";
import {StripeRoutes} from "./stripe.routes";


export class StripeModule {

  constructor(app: any) {
    new StripeRoutes(app, new StripeController());
  }
}
