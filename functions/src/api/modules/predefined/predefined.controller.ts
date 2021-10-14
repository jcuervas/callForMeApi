import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {PredefinedService} from "./predefined.service";
import {Predefined} from "./predefined.entity";

@Controller('predefineds')
export class PredefinedController {

  constructor(private repository: PredefinedService) {
  }

  @Get('')
  async query(req: any, res: any) {
    return this.repository.getRepository().find()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.repository.getRepository().findOneOrFail(+id)
  }

  @Post()
  async post(@Body() body: Predefined) {
    return this.repository.getRepository().save(new Predefined(body))
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Predefined) {
    return this.repository.getRepository().update(+id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.repository.getRepository().delete(+id)
  }
}
