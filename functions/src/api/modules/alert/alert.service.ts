import {CallAlert, MessageAlert} from "./alert.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Message} from "../messages/message.entity";
import {Call} from "../call/call.entity";
import {Event} from "../event/event.entity";

@Injectable()
export class AlertService {

  constructor(
    @InjectRepository(CallAlert) private callAlertRepository: Repository<CallAlert>,
    @InjectRepository(MessageAlert) private messageAlertRepository: Repository<MessageAlert>
  ) {
  }

  findCallAlertsByUser(user: string) {
    return this.callAlertRepository.createQueryBuilder('a')
      .innerJoin('user', 'u')
      .where('u.uid = :user')
      .setParameter('user', user).getMany();
  }

  findMessageAlertsByUser(user: string) {
    return this.callAlertRepository.createQueryBuilder('a')
      .innerJoin('user', 'u')
      .where('u.uid = :user')
      .setParameter('user', user).getMany();
  }

  async findByUser(user: string) {
    const callAlerts = await this.findCallAlertsByUser(user)
    const messageAlerts = await this.findMessageAlertsByUser(user)
    return [...callAlerts, ...messageAlerts]
  }

  getCallAlertRepository() {
    return this.callAlertRepository
  }
  getMessageAlertRepository() {
    return this.messageAlertRepository
  }

  createFromCall(call: Call) {
    return this.callAlertRepository.save(new CallAlert({
      date: call.startDate,
      state: 'programmed',
      isReminder: false,
      to: call.destinatary,
      call: call.id as number
    }))
  }

  createFromMessage(message: Message) {
    return this.messageAlertRepository.save(new MessageAlert({
      date: message.date,
      state: 'programmed',
      isReminder: false,
      to: message.destinatary,
      message: message.id as number
    }))
  }

  createFromEvent(event: Event) {
    if (!event.recipients) return
    const promises = []
    for (const recipient of event.recipients) {
      if (event.call) {
        promises.push(this.callAlertRepository.save(new CallAlert({
          date: event.notifyDate,
          state: 'programmed',
          isReminder: false,
          to: recipient,
          call: event.call
        })))
      }
      if (event.message) {
        promises.push(this.callAlertRepository.save(new CallAlert({
          date: event.notifyDate,
          state: 'programmed',
          isReminder: false,
          to: recipient,
          message: event.message
        })))
      }
    }
    return Promise.all(promises)
  }

  async findAll() {
    const callAlerts = await this.callAlertRepository.find()
    const messageAlerts = await this.messageAlertRepository.find()
    return [...callAlerts, ...messageAlerts]
  }

}
