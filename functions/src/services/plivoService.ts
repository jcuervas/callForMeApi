const plivo = require('plivo');

class PlivoService {

  constructor(
    private client = new plivo.Client()) {
  }

  sendMessage(parameters: { source: string; destination: string; message: string; }) {
    return this.client.messages.create(parameters.source, parameters.destination, parameters.message)
  }

  call(parameters: { source: string; destination: string; xml: string; }) {
    return this.client.calls.create(
      parameters.source,
      parameters.destination,
      '',
      {
        answerMethod: "GET",
      })
  }
}

export default new PlivoService();
