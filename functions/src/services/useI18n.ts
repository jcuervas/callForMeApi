import {Injectable} from "@nestjs/common";

interface TranslationInterface {
  'es-ES': Record<string, string>
  'en-US': Record<string, string>
}

const i18n: TranslationInterface = {
  'es-ES': {
    passwordSent: 'Contraseña enviada',
    emailNotConfirmed: 'Email not confirmed',
    invalidApiKey: 'Invalid api key',
    user_has_low_credit_title: 'Low credit!',
    user_has_low_credit_body: 'You have less than one € crédit, soon you will not be able to call or send messages',

  },
  'en-US': {
    passwordSent: 'Password sent',
    emailNotConfirmed: 'Email no confirmado',
    invalidApiKey: 'Clave del api no válida',
    user_has_low_credit_title: 'Credito bajo!',
    user_has_low_credit_body: 'Te queda menos de un € de crédito, pronto no podrás seguir enviando mensajes ni llamando',
  }
}

@Injectable()
export class TranslatorService {

  locale: 'es-ES' | 'en-US' = 'es-ES';

  setLocale(value: 'es-ES' | 'en-US') {
    this.locale = value
  }

  get(key: string) {
    return i18n[this.locale][key];
  }

}
