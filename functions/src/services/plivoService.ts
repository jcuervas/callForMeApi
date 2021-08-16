import {configuration} from "../config/environment";

const plivo = require('plivo');

class PlivoService {

  constructor(
    private client = new plivo.Client()) {
  }

  sendMessage(parameters: { source: string; destination: string; message: string; }) {
    return this.client.messages.create(parameters.source, parameters.destination, parameters.message)
  }

  call(parameters: { source: string; destination: string; id_alerta: number}) {
    return this.client.calls.create(
      parameters.source,
      parameters.destination,
      `${configuration.apiUrl}/PlivoAnswer/${parameters.id_alerta}`,
      {
        answerMethod: "GET",
        hangupUrl: '',
        hangupMethod: 'GET'
      })
  }
}

export default new PlivoService();
