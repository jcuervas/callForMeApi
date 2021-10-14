import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {MessageController} from "./message.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./message.entity";
import {AlertService} from "../alert/alert.service";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageModule, AlertService],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('messages')
  }
}
