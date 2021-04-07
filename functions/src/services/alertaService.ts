import {Alerta} from "../entity/alerta";
import {differenceInMinutes, startOfMinute} from "date-fns";
import {Mensaje} from "../entity/mensaje";
import {Llamada} from "../entity/llamada";
import {Usuario} from "../entity/usuario";
import {UserService} from "./userService";
import {convertToTimeZone} from "date-fns-timezone";

export class AlertaService {
  constructor(private alerta: Alerta) {}

  isProgrammed() {
    return this.alerta.estado === 'PROGRAMADA';
  }

  isInMinute() {
    const now = convertToTimeZone(startOfMinute(new Date()), {timeZone: 'UTC'});
    const alertaMinute = startOfMinute(new Date(this.alerta.fecha));
    return differenceInMinutes(now, alertaMinute) === 0;
  }

  userHasCreditToOperate() {
    const userService = new UserService(this.getUsuario())
    return userService.hasCreditToOperate();
  }

  getUsuario() {
    const mensaje = this.alerta.mensaje as Mensaje;
    const llamada = this.alerta.llamada as Llamada;
    return (mensaje && mensaje.usuario || llamada && llamada.usuario) as Usuario;
  }

  userNotifiedInPeriod() {
    const userService = new UserService(this.getUsuario())
    return userService.isNotifiedInPeriod();
  }
}
