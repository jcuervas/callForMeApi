import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {AnswerController} from "./answer.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Answer} from "./answer.entity";
import {AnswerService} from "./answer.service";

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('answers')
  }
}
