import {configuration} from "../config/environment";
import {Llamada} from "../entity/llamada";

const useXML = () => {
  function getPlivoCallXML(id_alerta: number, llamada: Llamada) {
    return `
    <Response>
    <Speak language="${llamada.idioma}" voice="${llamada.genero_voz}">${llamada.texto}</Speak>
    <Record action="${configuration.apiUrl}/plivoRecord/${id_alerta}" method="GET" />
    </Response>
    `;
  }

  return {
    getPlivoCallXML
  }
}

export default useXML();
