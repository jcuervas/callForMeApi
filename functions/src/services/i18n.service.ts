const locales = {
    es_ES: 'es_ES',
    en_US: 'en_US'
}
const i18n: any = {
    [locales.es_ES]: {
        TEXT_CONF_EMAIL:
            `<html><head><title>CallforMe</title></head><body><h1>Tu email, se ha configurado correctamente en la App de CallforMe.</h1><p>Ya puedes acceder a todas las funciones.</p><p>Llamadas, Mensajes y eMail programados -  Calendario.</p><p>Gracias por tu confianza.</p><p>Que tengas un magnifico día!</p>@ 2020 CallforMe App SL - Registro Mercantil Valencia - España</body></html>`
    },
    [locales.en_US]: {
        TEXT_CONF_EMAIL:
            `<html><head><title>CallforMe</title></head><body><h1>Your email has been correctly configured in the CallforMe App.</h1><p>You can now access all the functions.</p><p>Calls, Messages and eMail programmed - Calendar.</p><p>Thank you for your trust.</p><p>Have a great day!</p>@ 2020 CallforMe App SL - Mercantile Registry Valencia - Spain</body></html>`
    }
}
class i18nService {

    locale: 'es_ES'|'en_US' = 'es_ES';
    setLocale(locale: 'es_ES'|'en_US') {
        this.locale = locale
    }
    get(key: string){
        return i18n[this.locale][key];
    }
}
export default new i18nService();