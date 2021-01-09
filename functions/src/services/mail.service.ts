import Email from 'email-templates';
import * as path from "path";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";
import {configuration} from "../../config/environment";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class MailService {
    email: Email;

    constructor() {
        const transportOptions: SMTPTransport.Options = {
            service: 'smtp',
            host: configuration.mailConfig.host,
            port: configuration.mailConfig.port,
            secure: true,
            auth: {
                user: configuration.mailConfig.auth.user,
                pass: configuration.mailConfig.auth.pass
            },
        }
        const transport: Mail = nodemailer.createTransport(transportOptions);
        this.email = new Email({
            message: {
                from: configuration.mailConfig.sender,
                sender: configuration.mailConfig.senderToShow
            },
            // uncomment below to send emails in development/test env:
            send: true,
            transport,
            views: {
                options: {
                    extension: 'njk'
                }
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(__dirname, '..', 'assets')
                }
            }
        })
    }

    async sendEmail(target: string, link: string, locale: string, tpl: string, from: string | null = null) {
        try {
            const template = path.join(__dirname, '..', 'emails', locale, tpl);
            const options: Email.EmailOptions = {
                template,
                message: {
                    to: target
                },
                locals: {
                    link
                }
            }
            if (from) options.message.from = from;
            return await this.email
                .send(options)
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}
