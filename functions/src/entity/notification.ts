import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity()
export class Notification {

  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Usuario, usuario => usuario.firebaseTokens, {nullable: true, onDelete: "SET NULL"})
  @JoinColumn({name: 'usuario'})
  usuario?: number;

  @Column({type: "varchar"})
  title: string;

  @Column({type: "varchar"})
  body: string;

  @Column({type: 'json', nullable: true})
  payload?: any;

  @CreateDateColumn() created?: Date;

  constructor(props: any = {}) {
    this.id = props.id;
    this.usuario = props.usuario;
    this.title = props.title;
    this.body = props.body;
    this.payload = props.payload;
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
