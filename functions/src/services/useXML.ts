import {configuration} from "../config/environment";
import {Call} from "../entity/call";

const useXML = () => {
  function getPlivoCallXML(id_alerta: number, llamada: Call) {
    return `
    <Response>
    <Speak language="${llamada.idioma}" voice="${llamada.genero_voz}">${llamada.texto}</Speak>
    <Record action="${configuration.apiUrl}/plivoRecord/${id_alerta}" method="POST" />
    </Response>
    `;
  }

  return {
    getPlivoCallXML
  }
}

export default useXML();
