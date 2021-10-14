import {Controller, Get, Param, Post, Query} from "@nestjs/common";
import {AlertService} from "../alert/alert.service";
import {AnswerService} from "../answer/answer.service";
import {Call} from "../call/call.entity";
import axios from "axios";
import {Answer} from "../answer/answer.entity";

@Controller('plivo')
export class PlivoController {

  constructor(private alertsRepository: AlertService, private answerRepository: AnswerService) {
  }

  @Get('call/answer/:id')
  async getPlivoAnswer(@Param('id') id: string) {
    const alert = await this.alertsRepository.getCallAlertRepository().findOne(id);
    const url = (alert?.call as Call).storageUrl
    return axios.get(url)
  }

  @Get('call/:id')
  async getPlivoCall(@Param('id') id: string) {
    return this.alertsRepository.getCallAlertRepository().findOne(id);
  }

  @Get('message/:id')
  async getPlivoMessage(@Param('id') id: string) {
    return this.alertsRepository.getMessageAlertRepository().findOne(id);
  }

  @Post('call/record/:id')
  async postPlivoRecord(@Param('id') id: string, @Query() query: any) {
    const alert = await this.alertsRepository.getCallAlertRepository().findOneOrFail(id);
    const call = alert?.call as Call;
    if (!call) {
      return "Esta alerta no tiene llamada asignada";
    }
    const {RecordUrl, RecordingDuration, To} = query;
    const answer = new Answer({
      audio_url: RecordUrl,
      texto: '',
      estado: 'NOT_LISTENED',
      destinatario: To,
      alerta: alert.id,
      usuario: call.user,
      duracion: RecordingDuration
    })
    await this.answerRepository.getRepository().save(answer);
    return true;
  }

}
