import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {AlertController} from "./alert.controller";

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [],
})
export class AlertModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('alerts')
  }
}
