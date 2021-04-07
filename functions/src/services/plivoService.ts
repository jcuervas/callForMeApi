import {configuration} from "../config/environment";

const plivo = require('plivo');

class PlivoService {

  constructor(
    private client = new plivo.Client()) {
  }

  sendMessage(parameters: { source: string; destination: string; message: string; }) {
    return this.client.messages.create(parameters.source, parameters.destination, parameters.message)
  }

  call(parameters: { source: string; destination: string; xml: string; id_alerta: number;}) {
    return this.client.calls.create(
      parameters.source,
      parameters.destination,
      `${configuration.apiUrl}/plivoRecord/${parameters.id_alerta}`,
      {
        answerMethod: "GET",
      })
  }
}

export default new PlivoService();
