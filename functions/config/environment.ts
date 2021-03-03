import {config} from "./config";

export const functionsConfig = require('firebase-functions').config();

declare type environmentType = 'prod'|'dev'|'local';
export const environment: environmentType = functionsConfig && functionsConfig.config && functionsConfig.config.environment || process.env.NODE_ENV;
export const isProduction = () => environment === 'prod'

export const configuration = config[environment];
