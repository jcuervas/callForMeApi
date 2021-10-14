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
export class Predefined {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column() name: string;
  @Column({type: "text"}) text: string;

  @ManyToOne(() => User, user => user.predefineds, {onDelete: "CASCADE"})
  @JoinColumn()
  user: number | User;

  @UpdateDateColumn() updatedOn?: Date;
  @CreateDateColumn() createdOn?: Date;

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.text = props.text;
    this.user = props.user;
  }
}
