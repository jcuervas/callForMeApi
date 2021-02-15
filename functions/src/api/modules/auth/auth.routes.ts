import {AuthController} from "./auth.controller";

export class AuthRoutes {
    path = '/auth';

    constructor(private app: any, private controller: AuthController) {
        this.setupRoutes();
    }

    private setupRoutes() {
        this.app.post('/auth', this.controller.login);
        this.app.post('/auth/recover/:username', this.controller.recover);
        this.app.get('/auth/verifyPin/:id', this.controller.verifyPin);
    }
}
