import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class Notification {

  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, user => user.firebaseTokens, {nullable: true, onDelete: "SET NULL"})
  @JoinColumn({name: 'usuario'})
  user?: number;

  @Column({type: "varchar"})
  title: string;

  @Column({type: "varchar"})
  body: string;

  @Column({type: 'json', nullable: true})
  payload?: any;

  @UpdateDateColumn() updatedOn?: Date;
  @CreateDateColumn() createdOn: Date;

  constructor(props: any = {}) {
    this.id = props.id;
    this.user = props.usuario;
    this.title = props.title;
    this.body = props.body;
    this.payload = props.payload;
    this.createdOn = props.createdOn
  }

  getNotification() {
    return {
      notification: {
        title: this.title,
        body: this.body
      }
    }
  }

}
