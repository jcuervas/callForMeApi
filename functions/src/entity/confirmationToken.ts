import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity()
export class ConfirmationToken {

  @PrimaryGeneratedColumn() id?: number;
  @Column({type: "varchar"})
  content: string;
  @Column({type: "json"})
  tag: number[];
  @Column({type: "varchar"})
  iv: string;

  @ManyToOne(() => Usuario, usuario => usuario.confirmationTokens, {onDelete: "CASCADE"})
  @JoinColumn({name: 'usuario'})
  usuario: Usuario;

  constructor(props: any = {}) {
    this.id = props.id;
    this.content = props.content;
    this.tag = props.tag;
    this.iv = props.iv;
    this.usuario = props.usuario;
  }
}
