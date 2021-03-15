const plivo = require('plivo');

class PlivoService {

  constructor(
    private client = new plivo.Client()) {  }

  sendMessage(parameters: { source: string; destination: string; message: string; }) {
    return this.client.messages.create(parameters.source, parameters.destination, parameters.message)
  }

}

export default new PlivoService();
