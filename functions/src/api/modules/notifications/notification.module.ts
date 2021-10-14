import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Notification} from './notification.entity'
import {NotificationsService} from "./notifications.service";

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [],
  providers: [NotificationsService],
})
export class NotificationModule {}
