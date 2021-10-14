import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "../../middleware/auth.middleware";
import {StripeController} from "./stripe.controller";


@Module({
  controllers: [StripeController],
  providers: [StripeModule],
})
export class StripeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('stripe')
  }
}
