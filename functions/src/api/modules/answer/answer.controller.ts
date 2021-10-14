import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {AnswerService} from "./answer.service";
import {Answer} from "./answer.entity";

@Controller('answers')
export class AnswerController {

  constructor(private repository: AnswerService) {
  }

  @Get('')
  query() {
    return this.repository.getRepository().find()
  }

  @Post('')
  post(@Body() body: any) {
    return this.repository.getRepository().create(new Answer(body))
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: any) {
    return this.repository.getRepository().update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.repository.getRepository().delete(id)
  }
}
