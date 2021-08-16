import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "./event";
import {Message} from "./message";
import {Call} from "./call";
import {Answer} from "./answer";
import {dateTimeTransformer} from "../util/constants";

export type AlertState = 'programmed' | 'sent' | 'delivered' | 'completed' | 'no-answer' | 'failed' | 'not_enough_credit';


@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "datetime",
    transformer: dateTimeTransformer
  }) date: Date;
  @Column({default: 0}) cost: number
  @Column() state: AlertState
  @Column({nullable: true}) to?: string;

  @Column({type: 'boolean'})
  isReminder: boolean;

  @ManyToOne(() => Event, evento => evento.alertas, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn({name: 'evento'})
  event: Event | number;

  @OneToOne(() => Answer, respuesta => respuesta.alerta)
  answer?: Answer;

  constructor(props: any = {}) {
    this.id = props.id;

  }

}

@Entity()
export class CallAlert extends Alert {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Call, call => call.alerts, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn({name: 'llamada'})
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

  @ManyToOne(() => Message, message => message.alerts, {eager: true, onDelete: "CASCADE", nullable: true})
  @JoinColumn({name: 'mensaje'})
  message: Message | number;

  constructor(props: any = {}) {
    super(props);
    this.message = props.message;
  }
}
