import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";
import {Evento} from "./evento";
import {Alerta} from "./alerta";

@Entity({name: 'llamadas'})
export class Llamada {
    @PrimaryGeneratedColumn({name: "id_llamada"})
    id_llamada?: number;
    @Column({type: "text"}) texto?: string;
    @Column() destinatario?: string;
    @Column({nullable: true}) pais_destino?: string;
    @Column() idioma?: string;
    @Column() tiene_respuesta?: boolean;
    @Column() genero_voz?: 'MAN'|'WOMAN';
    @Column({type: "datetime"}) fecha_ini?: Date;
    @Column({type: "datetime", nullable: true}) fecha_fin?: Date;
    @Column({nullable: true}) unidad_repeticion?: string;
    @Column({nullable: true}) cantidad_repeticion?: number;
    @UpdateDateColumn() last_update?: Date;
    @Column() num_intentos?: number;


    @ManyToOne(() => Evento, evento => evento.llamadas)
    @JoinColumn({name: 'evento'})
    evento?: number;

    @ManyToOne(() => Usuario, usuario => usuario.llamadas)
    @JoinColumn({name: 'usuario'})
    usuario?: number;

    @OneToMany(() => Alerta, alerta => alerta.evento, {cascade: true})
    alertas?: Alerta[];

    constructor(props: any = {}) {
        this.id_llamada = props.id_llamada;
        this.texto = props.texto;
        this.destinatario = props.destinatario;
        this.pais_destino = props.pais_destino;
        this.idioma = props.idioma;
        this.tiene_respuesta = props.tiene_respuesta;
        this.genero_voz = props.genero_voz;
        this.fecha_ini = props.fecha_ini;
        this.fecha_fin = props.fecha_fin;
        this.unidad_repeticion = props.unidad_repeticion;
        this.cantidad_repeticion = props.cantidad_repeticion;
        this.num_intentos = props.num_intentos;
        this.evento = props.evento;
        this.usuario = props.usuario;
    }
}
