import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {AlertController} from "./alert.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Alert} from "./alert.entity";
import {AlertService} from "./alert.service";
import {CallService} from "../call/call.service";
import {MessageService} from "../messages/message.service";

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  controllers: [AlertController],
  providers: [AlertService, CallService, MessageService],
})
export class AlertModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('alerts')
  }
}
