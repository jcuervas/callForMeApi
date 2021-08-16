import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {UserController} from "./user.controller";
import {AuthMiddleware} from "../../middleware/auth.middleware";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user')
  }
}
