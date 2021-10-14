import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {UserController} from "./user.controller";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./userService";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user')
  }
}
