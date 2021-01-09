interface configuration {
    apiUrl: string;
    mailConfig: {
        host: string,
        port: number,
        sender: string,
        auth: {
            user: string,
            pass: string
        }
        senderToShow: string
    },
    serviceAccount: string
}
interface environments {
    prod: configuration;
    dev: configuration;
    local: configuration;
}
export const config: environments = {
    prod: {
        apiUrl: 'https://call-for-me-9b527.web.app',
        mailConfig: {
            host: 'smtp.1and1.es',
            port: 587,
            sender: 'info@callformeapp.com',
            auth: {
                user: 'correos.cifrados@callformeapp.com',
                pass: '63636363Kike'
            },
            senderToShow: 'Call for me'
        },
        serviceAccount: '../../service_account_dev.json'
    },
    dev: {
        apiUrl: 'https://callforme-2020.web.app',
        mailConfig: {
            host: 'smtp.1and1.es',
            port: 587,
            sender: 'info@callformeapp.com',
            auth: {
                user: 'correos.cifrados@callformeapp.com',
                pass: '63636363Kike'
            },
            senderToShow: 'Call for me'
        },
        serviceAccount: '../../service_account_dev.json'
    },
    local: {
        apiUrl: 'https://callforme-2020.web.app',
        mailConfig: {
            host: 'smtp.1and1.es',
            port: 587,
            sender: 'info@callformeapp.com',
            auth: {
                user: 'correos.cifrados@callformeapp.com',
                pass: '63636363Kike'
            },
            senderToShow: 'Call for me'
        },
        serviceAccount: '../../service_account_dev.json'
    }
}
