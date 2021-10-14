import {Message} from "./message.entity";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {MessageService} from "./message.service";
import {AlertService} from "../alert/alert.service";

@Controller('messages')
export class MessageController {

  constructor(private repository: MessageService, private alertsRepository: AlertService) {
  }

  @Get('')
  query() {
    return this.repository.getRepository().find()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.repository.getRepository().findOneOrFail(id)
  }

  @Post('')
  async post(@Body() body: Message) {
    const message = await this.repository.getRepository().save(new Message(body))
    return this.alertsRepository.createFromMessage(message)
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Message) {
    return this.repository.getRepository().update(+id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.repository.getRepository().delete(+id)
  }
}
