import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Alert} from "./alert";
import {User} from "./user";

@Entity({name: 'respuestas'})
export class Answer {
    @PrimaryGeneratedColumn({name: "id_respuesta"})
    id_respuesta?: number;

    @Column() audio_url: string;
    @Column() texto: string;
    @Column() duracion: number;
    @Column() estado: 'LISTENED'|'NOT_LISTENED';
    @UpdateDateColumn() last_update?: Date;
    @CreateDateColumn() creation_date?: Date;

    @Column() destinatario: string;

    @ManyToOne(() => Alert, alerta => alerta.respuestas, {onDelete: "CASCADE"})
    @JoinColumn({name: 'alerta'})
    alerta: number;

    @ManyToOne(() => User, usuario => usuario.answers, {onDelete: "CASCADE"})
    @JoinColumn()
    user: string;

    constructor(props: any = {}) {
        this.id_respuesta = props.id_respuesta;
        this.audio_url = props.audio_url;
        this.texto = props.texto;
        this.duracion = props.duracion;
        this.estado = props.estado;
        this.destinatario = props.destinatario;
        this.alerta = props.alerta;
        this.user = props.user;
    }

}
