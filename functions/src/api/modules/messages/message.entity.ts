import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Alert} from "../alert/alert.entity";
import {User} from "../user/user.entity";
import {Event} from "../event/event.entity";

export const MAX_ALERTAS = 300;

@Entity()
export class Message {

  @PrimaryGeneratedColumn()
  id?: number;
  @Column() text: string;
  @Column() destinatary: string;
  @Column() type: 'email' | 'sms';
  @Column({
    type: "datetime",
  }) date: Date;

  @ManyToOne(() => User, user => user.messages, {onDelete: "CASCADE"})
  @JoinColumn()
  user: number | User;

  @OneToMany(() => Event, event => event.call)
  events?: Event[];

  alert: Alert;

  constructor(props: any = {}) {
    this.id = props.id;
    this.text = props.text;
    this.destinatary = props.destinatary;
    this.type = props.type;
    this.date = props.date;
    this.user = props.email;
    this.alert = props.alert;
  }
}
