import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import {UserModule} from "./modules/user/user.module";
import {AnswerModule} from "./modules/answer/answer.module";
import {CallModule} from "./modules/call/call.module";
import {EventModule} from "./modules/event/event.module";
import {FirebaseTokensModule} from "./modules/firebaseTokens/firebaseTokens.module";
import {MessageModule} from "./modules/messages/menssage.module";
import {NotificationModule} from "./modules/notifications/notification.module";
import {PlivoModule} from "./modules/plivo/plivo.module";
import {StripeModule} from "./modules/stripe/stripe.module";
import {Alert, CallAlert, MessageAlert} from "./modules/alert/alert.entity";
import {Answer} from "./modules/answer/answer.entity";
import {Call} from "./modules/call/call.entity";
import {FirebaseToken} from "./modules/firebaseTokens/firebaseToken.entity";
import {Message} from "./modules/messages/message.entity";
import {Predefined} from "./modules/predefined/predefined.entity";
import {User} from "./modules/user/user.entity";
import {Event} from "./modules/event/event.entity";
import {Notification} from "./modules/notifications/notification.entity";

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT) || 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  autoLoadEntities: false,
  entities: [Alert, Answer, Call, Event, FirebaseToken, MessageAlert, CallAlert, Message, Notification, Predefined, User],
  logging: Boolean(process.env.TYPEORM_LOGGING),
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) || false,
}
console.log({typeOrmConfig})
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, AnswerModule, CallModule, EventModule, FirebaseTokensModule, MessageModule, NotificationModule, PlivoModule, StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
