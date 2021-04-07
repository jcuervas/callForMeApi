export const locales = {
  es_ES: 'es_ES',
  en_US: 'en_US'
}
type i18nKeys = 'TEXT_CONF_EMAIL'|
  'passwordSent'|
  'emailNotConfirmed'|
  'userNotFoundError'|
  'userDuplicatedError'|
  'confirmationTokenExpired'|
  'invalidApiKey'|
  'TEXT_PIN_REGISTRATION'|
  'maxTriesReached'|
  'wrongPin'|
  'emailAlreadyConfirmed'|
  'emailConfirmedTitle'|
  'emailConfirmedBody'|
  'user_has_low_credit_title'|
  'user_has_low_credit_body';

interface Translations {
  TEXT_CONF_EMAIL: string;
  passwordSent: string;
  emailNotConfirmed: string;
  userNotFoundError: string;
  userDuplicatedError: string;
  confirmationTokenExpired: string;
  invalidApiKey: string;
  TEXT_PIN_REGISTRATION: string;
  maxTriesReached: string;
  wrongPin: string;
  emailAlreadyConfirmed: string;
  emailConfirmedTitle: string;
  emailConfirmedBody: string;
  user_has_low_credit_title: string;
  user_has_low_credit_body: string;
}

interface TranslationsLangs {
  es_ES: Translations
  en_US: Translations
}

const i18n: TranslationsLangs = {
  es_ES: {
    TEXT_CONF_EMAIL:
      `<html><head><title>CallforMe</title></head><body><h1>Tu email, se ha configurado correctamente en la App de CallforMe.</h1><p>Ya puedes acceder a todas las funciones.</p><p>Llamadas, Mensajes y eMail programados -  Calendario.</p><p>Gracias por tu confianza.</p><p>Que tengas un magnifico día!</p>@ 2020 CallforMe App SL - Registro Mercantil Valencia - España</body></html>`,
    passwordSent: 'Contraseña enviada',
    emailNotConfirmed: 'Email not confirmed',
    userNotFoundError: 'User not found',
    userDuplicatedError: 'User already exists',
    confirmationTokenExpired: 'Confirmation token expired, a new one has been sent to your inbox.',
    invalidApiKey: 'Invalid api key',
    TEXT_PIN_REGISTRATION: 'Insert the following 4-digit number in order to confirm your registration for CallforMe App:',
    maxTriesReached: 'Wrong number, maximum tries reached',
    wrongPin: 'Wrong pin',
    emailAlreadyConfirmed: 'This email has been already confirmed',
    emailConfirmedTitle: 'Email confirmed',
    emailConfirmedBody: 'Your email has been successfully confirmed, you can now access Call for me.',
    user_has_low_credit_title: 'Low credit!',
    user_has_low_credit_body: 'You have less than one € crédit, soon you will not be able to call or send messages',

  },
  en_US: {
    TEXT_CONF_EMAIL:
      `<html><head><title>CallforMe</title></head><body><h1>Your email has been correctly configured in the CallforMe App.</h1><p>You can now access all the functions.</p><p>Calls, Messages and eMail programmed - Calendar.</p><p>Thank you for your trust.</p><p>Have a great day!</p>@ 2020 CallforMe App SL - Mercantile Registry Valencia - Spain</body></html>`,
    passwordSent: 'Password sent',
    emailNotConfirmed: 'Email no confirmado',
    userNotFoundError: 'No se ha encontrado el usuario',
    userDuplicatedError: 'El usuario ya existe',
    confirmationTokenExpired: 'El token de confirmación ha expirado, te hemos enviado uno nuevo a tu bandeja de entrada.',
    invalidApiKey: 'Clave del api no válida',
    TEXT_PIN_REGISTRATION: 'Inserte los siguientes 4 digitos para confirmar el registro de su teléfono en CallforMe App:',
    maxTriesReached: 'Número erróneo, intentos agotados',
    wrongPin: 'Pin erroneo',
    emailAlreadyConfirmed: 'Este email ya está confirmado',
    emailConfirmedTitle: 'Email confirmado',
    emailConfirmedBody: 'Tu email ha sido confirmado con éxito, puedes acceder a Call for me',
    user_has_low_credit_title: 'Credito bajo!',
    user_has_low_credit_body: 'Te queda menos de un € de crédito, pronto no podrás seguir enviando mensajes ni llamando',
  }
}

const useI18n = () => {

  let locale: 'es_ES' | 'en_US' = 'es_ES';

  function setLocale(value: 'es_ES' | 'en_US') {
    locale = value
  }

  function get(key: i18nKeys) {
    return i18n[locale][key];
  }

  return {
    setLocale,
    get
  }
}

export default useI18n();
