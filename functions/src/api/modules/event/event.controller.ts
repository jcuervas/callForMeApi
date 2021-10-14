import {Event} from "./event.entity";
import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {EventService} from "./event.service";

@Controller('events')
export class EventController {

  constructor(private repository: EventService) {
  }

  @Get()
  query() {
    return this.repository.getRepository().find()
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.repository.getRepository().findOneOrFail(id)
  }

  @Post('')
  post(@Body() body: Event) {
    return this.repository.getRepository().create(new Event(body))
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: Event) {
    return this.repository.getRepository().update(+id, body)
  }

  delete(@Param('id') id: string) {
    return this.repository.getRepository().delete(id)
  }
}
