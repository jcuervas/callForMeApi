import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Alert} from "../alert/alert.entity";
import {Event} from "../event/event.entity";

@Entity()
export class Call {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({type: "text"}) text?: string;
  @Column() destinatary?: string;
  @Column({nullable: true}) destinationCountry?: string;
  @Column() lang?: string;
  @Column() hasAnswer?: boolean;
  @Column() voiceGender?: 'MAN' | 'WOMAN';
  @Column({type: "datetime"}) startDate: Date;
  @Column({type: "datetime", nullable: true}) endDate?: Date;
  @Column({nullable: true}) numTries?: number;
  @Column({nullable: true}) tryIntervalMilliseconds?: number;
  @Column({nullable: true}) currentTries?: number;

  @Column({type: 'text'}) storageUrl: string;

  @ManyToOne(() => User, user => user.calls, {eager: true, onDelete: "CASCADE"})
  @JoinColumn({name: 'usuario'})
  user: number | User;

  alert: number | Alert;

  @UpdateDateColumn() updatedOn?: Date;
  @CreateDateColumn() createdOn?: Date;

  @OneToMany(() => Event, event => event.call)
  events?: Event[];

  constructor(props: any = {}) {
    this.id = props.id;
    this.text = props.text;
    this.destinatary = props.destinatary;
    this.destinationCountry = props.destinationCountry;
    this.lang = props.lang;
    this.hasAnswer = props.hasAnswer;
    this.voiceGender = props.voiceGender;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.numTries = props.numTries;
    this.tryIntervalMilliseconds = props.tryIntervalMilliseconds;
    this.currentTries = props.currentTries;
    this.storageUrl = props.storageUrl || '';
    this.user = props.user;
    this.alert = props.alert;
  }
}
