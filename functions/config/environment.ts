import {config} from "./config";

export const functionsConfig = require('firebase-functions').config();

declare type environmentType = 'prod'|'dev'|'local';
export const environment: environmentType = process.env.NODE_ENV || functionsConfig.config.environment;

export const isProduction = () => environment === 'prod'

export const configuration = config[environment];
