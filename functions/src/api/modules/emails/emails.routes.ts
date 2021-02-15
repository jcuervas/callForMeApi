import {EmailsController} from "./emails.controller";
import useSecurity from "../../../services/useSecurity";

const express = require('express');

export class EmailsRoutes {
    emails = '/emails';
    emailConfirmation = '/emailConfirmation';

    constructor(private app: any, private controller: EmailsController) {
        this.setupRoutes()
    }

    private setupRoutes() {
        const emailsRouter = express.Router();
        const emailConfirmationRouter = express.Router();
        emailsRouter.use(useSecurity.checkIfAuthenticated)
        emailConfirmationRouter.get('/', this.controller.getEmailConfirmation);

        emailsRouter.get('/', this.controller.get);
        emailsRouter.post('/', this.controller.post);

        emailsRouter.get('/:id', this.controller.getById);
        emailsRouter.put('/:id', this.controller.put);
        emailsRouter.patch('/:id', this.controller.patch);
        emailsRouter.delete('/:id', this.controller.delete);

        this.app.use(this.emails, emailsRouter)
        this.app.use(this.emailConfirmation, emailConfirmationRouter)
    }
}
