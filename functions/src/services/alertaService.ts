import {Alert} from "../entity/alert";
import {differenceInMinutes, startOfMinute} from "date-fns";
import {Message} from "../entity/message";
import {Call} from "../entity/call";
import {User} from "../entity/user";
import {UserService} from "./userService";
import {convertToTimeZone} from "date-fns-timezone";

export class AlertaService {
  constructor(private alerta: Alert) {}

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
    const mensaje = this.alerta.mensaje as Message;
    const llamada = this.alerta.llamada as Call;
    return (mensaje && mensaje.usuario || llamada && llamada.user) as User;
  }

  userNotifiedInPeriod() {
    const userService = new UserService(this.getUsuario())
    return userService.isNotifiedInPeriod();
  }
}
