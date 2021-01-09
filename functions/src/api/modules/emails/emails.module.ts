import {EmailsRoutes} from "./emails.routes";
import {EmailsController} from "./emails.controller";

export class EmailsModule {

    constructor(app: any) {
        new EmailsRoutes(app, new EmailsController());
    }
}
