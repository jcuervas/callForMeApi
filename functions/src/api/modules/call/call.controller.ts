import {Body, Controller, Delete, Get, Param, Put, Query} from "@nestjs/common";
import {CallService} from "./call.service";
import {Call} from "./call.entity";

@Controller('calls')
export class CallController {

  constructor(private callRepository: CallService) {
  }

  @Get('')
  async query(@Query() query: any) {
    const {alert, user, listened} = query;
    return this.callRepository.getRepository().createQueryBuilder('c')
      .where('c.alert = :alert and c.user = :user and c.listened = :listened')
      .setParameter('alert', alert).setParameter('user', user).setParameter('listened', listened)
      .getMany()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.callRepository.getRepository().findOneOrFail(id);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Call) {
    return this.callRepository.getRepository().update(id, new Call(body));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.callRepository.getRepository().delete(id);
  }
}
