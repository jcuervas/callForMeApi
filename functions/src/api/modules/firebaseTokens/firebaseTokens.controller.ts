import {FirebaseToken} from "./firebaseToken.entity";
import {FirebaseTokensService} from "./firebaseTokens.service";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

@Controller('firebaseTokens')
export class FirebaseTokensController {

  constructor(private repository: FirebaseTokensService) {
  }

  @Get('')
  query() {
    return this.repository.getRepository().find()
  }

  @Post('')
  post(@Body() body: FirebaseToken) {
    return this.repository.getRepository().create(body)
  }

  @Put('id')
  put(@Param('id') id: string, body: FirebaseToken) {
    return this.repository.getRepository().update(id, body)
  }

  @Delete('id')
  delete(@Param('id') id: string) {
    return this.repository.getRepository().delete(id)
  }
}
