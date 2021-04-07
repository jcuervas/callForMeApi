import * as path from "path";

interface configuration {
  apiUrl: string;
  mailConfig: {
    host: string;
    port: number;
    sender: string;
    auth: {
      user: string;
      pass: string;
    }
    senderToShow: string;
  },
  storageBucket: string;
  serviceAccount: string;
  stripeApiKey: string;
  plivo: {
    minCreditToOperate: number;
    creditMinNotification: number;
    maxNotificationPeriod: 'minute'|'hour'|'day'|'week'|'month'|'year';
  }
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
    storageBucket: 'gs://call-for-me-9b527.appspot.com/',
    serviceAccount: path.join(__dirname,'../../service_account.json'),
    stripeApiKey: process.env.STRIPE_API_KEY as string,
    plivo: {
      minCreditToOperate: 0.2,
      creditMinNotification: 1,
      maxNotificationPeriod: "day"
    }
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
    storageBucket: 'gs://callforme-2020.appspot.com/',
    serviceAccount: path.join(__dirname,'../../service_account_dev.json'),
    stripeApiKey: process.env.STRIPE_API_KEY as string,
    plivo: {
      minCreditToOperate: 0.2,
      creditMinNotification: 1,
      maxNotificationPeriod: "day"
    }
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
    storageBucket: 'gs://callforme-2020.appspot.com/',
    serviceAccount: path.join(__dirname,'../../service_account_dev.json'),
    stripeApiKey: process.env.STRIPE_API_KEY as string,
    plivo: {
      minCreditToOperate: 0.2,
      creditMinNotification: 1,
      maxNotificationPeriod: "minute"
    }
  }
}
