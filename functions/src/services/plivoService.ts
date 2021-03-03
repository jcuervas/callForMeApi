import {functionsConfig} from "../../config/environment";

const plivo = require('plivo');

class PlivoService {

  constructor(
    private client = new plivo.Client(
      process.env.PLIVO_AUTH_ID || functionsConfig.plivo.auth_id,
      process.env.PLIVO_AUTH_TOKEN || functionsConfig.plivo.auth_token)) {  }

  sendMessage(parameters: { source: string; destination: string; message: string; }) {
    return this.client.messages.create(parameters.source, parameters.destination, parameters.message)
  }

}

export default new PlivoService();
