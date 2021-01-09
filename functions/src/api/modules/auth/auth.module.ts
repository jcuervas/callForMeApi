import {AuthController} from "./auth.controller";
import {AuthRoutes} from "./auth.routes";

export class AuthModule {

    constructor(app: any) {
        new AuthRoutes(app, new AuthController());
    }
}
