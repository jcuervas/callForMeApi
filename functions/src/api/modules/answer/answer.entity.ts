import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Alert} from "../alert/alert.entity";
import {User} from "../user/user.entity";


@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column() audioUrl: string;
    @Column() text: string;
    @Column() duration: number;
    @Column() listened: boolean
    @UpdateDateColumn() updatedOn?: Date;
    @CreateDateColumn() createdOn?: Date;

    @Column() destinatary: string;

    @ManyToOne(() => Alert, alert => alert.answer, {onDelete: "CASCADE"})
    @JoinColumn()
    alert: number|Alert;

    @ManyToOne(() => User, usuario => usuario.answers, {onDelete: "CASCADE"})
    @JoinColumn()
    user: string|User;

    constructor(props: any = {}) {
        this.id = props.id;
        this.audioUrl = props.audioUrl;
        this.text = props.text;
        this.duration = props.duration;
        this.listened = props.listened;
        this.updatedOn = props.updatedOn;
        this.createdOn = props.createdOn;
        this.destinatary = props.destinatary;
        this.alert = props.alert;
        this.user = props.user;
    }

}
