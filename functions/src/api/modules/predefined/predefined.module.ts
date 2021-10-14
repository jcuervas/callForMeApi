import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {PredefinedController} from "./predefined.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Predefined} from "./predefined.entity";
import {PredefinedService} from "./predefined.service";

@Module({
  imports: [TypeOrmModule.forFeature([Predefined])],
  controllers: [PredefinedController],
  providers: [PredefinedService],
})
export class PredefinedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('predefined')
  }
}
