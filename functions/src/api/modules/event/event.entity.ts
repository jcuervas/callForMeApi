import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Alert} from "../alert/alert.entity";
import {Call} from "../call/call.entity";
import {Message} from "../messages/message.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn() id?: number;
  @Column() title?: string;
  @Column({type: "double"}) duration?: number;
  @Column({type: "text"}) description?: string;
  @Column() location?: string;
  @Column({
    type: "datetime",
  }) startDate: Date;

  @Column({
    type: "datetime",
  }) notifyDate: Date;

  @ManyToOne(() => Call, call => call.events, {onDelete: "RESTRICT"})
  @JoinColumn()
  call?: Call|number

  @ManyToOne(() => Message, message => message.events, {onDelete: "RESTRICT"})
  @JoinColumn()
  message?: Message|number

  @ManyToOne(() => User, user => user.events, {onDelete: "CASCADE"})
  @JoinColumn()
  creator?: number;

  @Column({type: "json"})
  recipients?: string[];

  @OneToMany(() => Alert, alert => alert.event, {cascade: true})
  alerts?: Alert[];

  @UpdateDateColumn() updatedOn?: Date;
  @CreateDateColumn() createdOn: Date;

  constructor(props: any = {}) {
    this.id = props.id;
    this.title = props.title;
    this.duration = props.duration;
    this.description = props.description;
    this.location = props.location;
    this.startDate = props.startDate;
    this.notifyDate = props.notifyDate;
    this.creator = props.creator;
    this.createdOn = props.createdOn;
    this.recipients = props.recipients;
    this.call = props.call;
  }
}
