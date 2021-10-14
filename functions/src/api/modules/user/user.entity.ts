import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn} from "typeorm";
import {Alert} from "../alert/alert.entity";
import {Event} from "../event/event.entity";
import {Predefined} from "../predefined/predefined.entity";
import {Answer} from "../answer/answer.entity";
import {Call} from "../call/call.entity";
import {Notification} from "../notifications/notification.entity";
import {Message} from "../messages/message.entity";
import {FirebaseToken} from "../firebaseTokens/firebaseToken.entity";


export type Config = {
  notifications: {
    lowCredit: boolean
    afterCall: boolean
    beforeCall: boolean
    afterMessage: boolean
    beforeMessage: boolean
    afterEvent: boolean
    beforeEvent: boolean
  }
}

@Entity()
export class User {
  @PrimaryColumn({type: 'varchar'})
  uid?: string;

  @Column({nullable: true}) displayName?: string;
  @Column() phoneNumber: string;
  @Column() email: string;
  @Column({type: "double", default: 0}) credit?: number;
  @Column({type: "varchar", length: 45}) stripe_id?: string;
  @Column() countryCode: string;
  @Column({type: 'json'}) configuration: Config

  @OneToMany(() => Call, call => call.user, {cascade: true})
  calls?: Call[];

  @OneToMany(() => Answer, answer => answer.user, {cascade: true})
  answers?: Answer[];

  @OneToMany(() => Predefined, predefined => predefined.user, {cascade: true})
  predefineds?: Predefined[];

  @OneToMany(() => Event, event => event.creator, {cascade: true})
  events?: Event[];

  @OneToMany(() => Alert, alert => alert.user, {cascade: true})
  alerts?: Alert[];

  @OneToMany(() => Message, message => message.user, {cascade: true})
  messages?: Message[];

  @OneToMany(() => FirebaseToken, firebaseToken => firebaseToken.user)
  @JoinColumn() firebaseTokens?: FirebaseToken[]

  @OneToMany(() => Notification, notification => notification.user)
  @JoinColumn() notifications?: Notification[]

  constructor(props: any = {}) {
    this.uid = props.uid;
    this.phoneNumber = props.phoneNumber;
    this.email = props.email;
    this.countryCode = props.countryCode;
    this.configuration = props.configuration;
    this.stripe_id = props.stripe_id;
    this.notifications = props.notifications;
  }
}
