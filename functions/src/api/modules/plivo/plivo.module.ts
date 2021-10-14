import {PlivoController} from "./plivo.controller";
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {AlertService} from "../alert/alert.service";
import {AnswerService} from "../answer/answer.service";
import {CallService} from "../call/call.service";
import {MessageService} from "../messages/message.service";
import {AnswerModule} from "../answer/answer.module";

@Module({
  imports: [AnswerModule],
  controllers: [PlivoController],
  providers: [PlivoModule, AnswerService, AlertService, CallService, MessageService],
})
export class PlivoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('plivo')
  }
}
