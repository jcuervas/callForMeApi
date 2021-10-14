import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class FirebaseToken {
  @PrimaryColumn() device: string;

  @ManyToOne(() => User, user => user.firebaseTokens, {nullable: true, onDelete: "SET NULL"})
  @JoinColumn({name: 'usuario'})
  user?: number;

  @Column()
  token: string;

  @UpdateDateColumn() updatedOn?: Date;
  @CreateDateColumn() createdOn?: Date;

  constructor(props: any = {}) {
    this.user = props.usuario ? props.usuario : null;
    this.token = props.token;
    this.device = props.device;
  }
}
