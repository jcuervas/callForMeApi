import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Event} from "./event";
import {Email} from "./email";
import {Alert} from "./alert";
import {User} from "./user";
import {timeUnit} from "../util/util";
import {dateTimeTransformer} from "../util/constants";

export const MAX_ALERTAS = 300;

@Entity({name: 'mensajes'})
export class Message {

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

    @ManyToOne(() => Event, evento => evento.mensajes, {onDelete: "CASCADE"})
    @JoinColumn({name: 'evento'})
    evento: number;

    @ManyToOne(() => Email, email => email.mensajes, {onDelete: "CASCADE"})
    @JoinColumn({name: 'email'})
    user: number;

    @ManyToOne(() => User, usuario => usuario.messages, {eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario: number|User;

    @OneToMany(() => Alert, alerta => alerta.evento, {cascade: true})
    alerts: Alert[];

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
        this.user = props.email;
        this.usuario = props.usuario;
        this.alerts = props.alertas;
    }

    populateAlertasWithId() {
      this.alerts = this.alerts?.map(a => {
        a.mensaje = this.id_mensaje!;
        return a;
      })
    }
}
