import {FirebaseTokensController} from "./firebaseTokens.controller";
import {FirebaseTokensRoutes} from "./firebaseTokens.routes";

export class FirebaseTokensModule {

    constructor(app: any) {
        new FirebaseTokensRoutes(app, new FirebaseTokensController());
    }
}
