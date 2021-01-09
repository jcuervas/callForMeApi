import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";
import {Llamada} from "./llamada";
import {Alerta} from "./alerta";
import {Mensaje} from "./mensaje";

@Entity({name: 'eventos'})
export class Evento {
    @PrimaryGeneratedColumn({name: "id_evento"})
    id_evento?: number;
    @Column() titulo?: string;
    @Column({type: "double"}) duracion?: number;
    @Column({type: "text"}) descripcion?: string;
    @Column() lugar?: string;
    @Column({type: "datetime"}) fecha_ini?: Date;
    @Column({ type: "datetime", nullable: true}) fecha_fin?: Date;
    @Column({nullable: true}) unidad_repeticion?: string;
    @Column({nullable: true}) cantidad_repeticion?: number;
    @UpdateDateColumn() last_update?: Date;

    @ManyToOne(() => Usuario, usuario => usuario.eventos)
    @JoinColumn({name: 'usuario'})
    usuario?: number;

    @OneToMany(() => Llamada, llamada => llamada.evento, {cascade: true})
    llamadas?: Llamada[];

    @OneToMany(() => Alerta, alerta => alerta.evento, {cascade: true})
    alertas?: Alerta[];

    @OneToMany(() => Mensaje, mensaje => mensaje.evento, {cascade: true})
    mensajes?: Mensaje[];

    constructor(props: any = {}) {
        this.id_evento = props.id_evento;
        this.titulo = props.titulo;
        this.duracion = props.duracion;
        this.descripcion = props.descripcion;
        this.lugar = props.lugar;
        this.fecha_ini = props.fecha_ini;
        this.fecha_fin = props.fecha_fin;
        this.unidad_repeticion = props.unidad_repeticion;
        this.cantidad_repeticion = props.cantidad_repeticion;
        this.usuario = props.usuario;
    }
}