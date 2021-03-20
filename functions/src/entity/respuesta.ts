import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Alerta} from "./alerta";
import {Usuario} from "./usuario";

@Entity({name: 'respuestas'})
export class Respuesta {
    @PrimaryGeneratedColumn({name: "id_respuesta"})
    id_respuesta?: number;

    @Column() audio_url: string;
    @Column() texto: string;
    @Column() duracion: number;
    @Column() estado: 'LISTENED'|'NOT_LISTENED';
    @UpdateDateColumn() last_update?: Date;
    @Column() destinatario: string;

    @ManyToOne(() => Alerta, alerta => alerta.respuestas, {onDelete: "CASCADE"})
    @JoinColumn({name: 'alerta'})
    alerta: number;

    @ManyToOne(() => Usuario, usuario => usuario.respuestas, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario: number|Alerta;

    constructor(props: any = {}) {
        this.id_respuesta = props.id_respuesta;
        this.audio_url = props.audio_url;
        this.texto = props.texto;
        this.duracion = props.duracion;
        this.estado = props.estado;
        this.destinatario = props.destinatario;
        this.alerta = props.alerta;
        this.usuario = props.usuario;
    }

}
