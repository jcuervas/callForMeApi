import {configuration} from "../config/environment";

const useXML = () => {
  function getPlivoXML(id_alerta: number) {
    const template = `
    <Response>
    <Speak language="%s" voice="%s">%s</Speak>
    <Record action="${configuration.apiUrl}/plivoRecord/${id_alerta}" method="GET" />
    </Response>
    `;
    return template;
  }

  return {
    getPlivoXML
  }
}

export default useXML();
