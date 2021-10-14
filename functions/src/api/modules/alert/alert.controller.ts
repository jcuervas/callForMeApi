import {Body, Controller, Delete, Get, Param, Put} from "@nestjs/common";
import {AlertService} from "./alert.service";

@Controller('alerts')
export class AlertController {

  constructor(private repository: AlertService) {
  }

  @Get('')
  async get() {
    return this.repository.findAll();
  }

  @Get(':user')
  async getByUser(@Param('user') user: string) {
    return this.repository.findByUser(user);
  }

  @Get(':type/:id')
  async getById(@Param('id') id: string, @Param('type') type: 'call'|'message') {
    if (type === 'call') {
      return this.repository.getCallAlertRepository().findOneOrFail(id)
    } else {
      return this.repository.getMessageAlertRepository().findOneOrFail(id)
    }
  }

  @Put(':type/:id')
  async put(@Param('id') id: string, @Param('type') type: 'call'|'message', @Body() body: any) {
    if (type === 'call') {
      return this.repository.getCallAlertRepository().update(id, body)
    } else {
      return this.repository.getMessageAlertRepository().update(id, body)
    }
  }

  @Delete(':type/id')
  async delete(@Param('id') id: string, @Param('type') type: 'call'|'message') {
    if (type === 'call') {
      return this.repository.getCallAlertRepository().delete(id)
    } else {
      return this.repository.getMessageAlertRepository().delete(id)
    }
  }
}
