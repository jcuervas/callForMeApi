import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity({name: 'configuraciones'})
export class Configuracion {
    @PrimaryGeneratedColumn({name: 'id_configuracion'})
    id_configuracion?: number

    @Column({default: true, nullable: false}) not_credito_bajo?: boolean;
    @Column({default: true, nullable: false}) not_llamadas_post?: boolean;
    @Column({default: true, nullable: false}) not_mensajes_post?: boolean;
    @Column({default: true, nullable: false}) not_llamadas_pre?: boolean;
    @Column({default: true, nullable: false}) not_mensajes_pre?: boolean;
    @Column({default: true, nullable: false}) not_eventos_pre?: boolean;
    @UpdateDateColumn() last_update?: Date;

    @OneToOne(() => Usuario, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario?: number;

    constructor(props: any = {}) {
        this.id_configuracion = props.id_configuracion;
        this.not_credito_bajo = props.not_credito_bajo;
        this.not_llamadas_post = props.not_llamadas_post;
        this.not_mensajes_post = props.not_mensajes_post;
        this.not_llamadas_pre = props.not_llamadas_pre;
        this.not_mensajes_pre = props.not_mensajes_pre;
        this.not_eventos_pre = props.not_eventos_pre;
        this.usuario = props.usuario;
    }
}
