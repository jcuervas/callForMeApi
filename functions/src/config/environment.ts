import {config} from "./config";

declare type environmentType = 'prod'|'dev'|'local';
export const environment: environmentType = process.env.NODE_ENV as environmentType;
export const isProduction = () => environment === 'prod'

export const configuration = config[environment];
