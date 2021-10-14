import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Answer} from "../answer/answer.entity";
import {Message} from "../messages/message.entity";
import {Call} from "../call/call.entity";
import {convertToTimeZone} from "date-fns-timezone";
import {differenceInMinutes, startOfMinute} from "date-fns";
import {User} from "../user/user.entity";
import {Event} from "../event/event.entity";


export type AlertState = 'programmed' | 'sent' | 'delivered' | 'completed' | 'no-answer' | 'failed' | 'not_enough_credit';


@Entity()
export class Alert {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "datetime",
  }) date: Date;
  @Column({default: 0}) cost?: number
  @Column() state: AlertState
  @Column({nullable: true}) to?: string;

  @Column({type: 'boolean'})
  isReminder: boolean;

  @ManyToOne(() => Event, event => event.alerts, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn()
  event: Event | number;

  @ManyToOne(() => User, user => user.alerts, {onDelete: 'CASCADE'})
  @JoinColumn() user: User|number

  @OneToOne(() => Answer, answer => answer.alert)
  answer?: Answer;

  constructor(props: any = {}) {
    this.id = props.id
    this.date = props.date
    this.cost = props.cost
    this.state = props.state
    this.isReminder = props.isReminder
    this.event = props.event
    this.user = props.user
    this.answer = props.answer
  }

  isProgrammed() {
    return this.state === 'programmed';
  }

  isInCurrentMinute() {
    const now = convertToTimeZone(startOfMinute(new Date()), {timeZone: 'UTC'});
    const alertaMinute = startOfMinute(new Date(this.date));
    return differenceInMinutes(now, alertaMinute) === 0;
  }
}

@Entity()
export class CallAlert extends Alert {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => Call, call => call.alert, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn()
  call: Call | number;

  constructor(props: any = {}) {
    super(props);
    this.call = props.call;
  }
}

@Entity()
export class MessageAlert extends Alert {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => Message, message => message.alert, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn({name: 'mensaje'})
  message: Message | number;

  constructor(props: any = {}) {
    super(props);
    this.message = props.message;
  }
}
