import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {CallController} from "./call.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Call} from "./call.entity";
import {CallService} from "./call.service";

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('calls')
  }
}
