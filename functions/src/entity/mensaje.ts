import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Evento} from "./evento";
import {Email} from "./email";
import {Alerta} from "./alerta";
import {Usuario} from "./usuario";
import {timeUnit} from "../util/util";
import {dateTimeTransformer} from "../util/constants";

export const MAX_ALERTAS = 300;

@Entity({name: 'mensajes'})
export class Mensaje {

    @PrimaryGeneratedColumn({name: "id_mensaje"})
    id_mensaje?: number;
    @Column() texto: string;
    @Column() destinatario: string;
    @Column() tipo: string;
    @Column({
      type: "datetime",
      transformer: dateTimeTransformer
    }) fecha_ini: Date;
    @Column({
      type: "datetime",
      transformer: dateTimeTransformer,
      nullable: true
    }) fecha_fin?: Date;
    @Column({nullable: true}) unidad_repeticion?: timeUnit;
    @Column({nullable: true}) cantidad_repeticion?: number;
    @UpdateDateColumn({
      type: "datetime",
      transformer: dateTimeTransformer
    }) last_update?: Date;

    @ManyToOne(() => Evento, evento => evento.mensajes, {onDelete: "CASCADE"})
    @JoinColumn({name: 'evento'})
    evento: number;

    @ManyToOne(() => Email, email => email.mensajes, {onDelete: "CASCADE"})
    @JoinColumn({name: 'email'})
    email: number;

    @ManyToOne(() => Usuario, usuario => usuario.mensajes, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario: number;

    @OneToMany(() => Alerta, alerta => alerta.evento, {cascade: true})
    alertas: Alerta[];

    constructor(props: any = {}) {
        this.id_mensaje = props.id_mensaje;
        this.texto = props.texto;
        this.destinatario = props.destinatario;
        this.tipo = props.tipo;
        this.fecha_ini = props.fecha_ini;
        this.fecha_fin = props.fecha_fin;
        this.unidad_repeticion = props.unidad_repeticion;
        this.cantidad_repeticion = props.cantidad_repeticion;
        this.evento = props.evento;
        this.email = props.email;
        this.usuario = props.usuario;
        this.alertas = props.alertas;
    }

    populateAlertasWithId() {
      this.alertas = this.alertas?.map(a => {
        a.mensaje = this.id_mensaje!;
        return a;
      })
    }
}
