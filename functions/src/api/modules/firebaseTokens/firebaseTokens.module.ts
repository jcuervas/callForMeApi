import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {FirebaseTokensController} from "./firebaseTokens.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FirebaseToken} from "./firebaseToken.entity";
import {FirebaseTokensService} from "./firebaseTokens.service";

@Module({
  imports: [TypeOrmModule.forFeature([FirebaseToken])],
  controllers: [FirebaseTokensController],
  providers: [FirebaseTokensService],
})
export class FirebaseTokensModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('firebaseTokens')
  }
}
