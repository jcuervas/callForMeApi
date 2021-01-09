import {config} from "./config";

const functions = require("firebase-functions");

declare type environmentType = 'prod'|'dev'|'local';

export const environment: environmentType = functions.config().config && functions.config().config.environment
    || process.env.NODE_ENV
    || 'local';

export const configuration = config[environment];
