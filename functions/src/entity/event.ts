import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user";
import {Call} from "./call";
import {Alert} from "./alert";
import {Message} from "./message";
import {timeUnit} from "../util/util";
import {dateTimeTransformer} from "../util/constants";

@Entity({name: 'eventos'})
export class Event {
    @PrimaryGeneratedColumn({name: "id_evento"})
    id_evento?: number;
    @Column() titulo?: string;
    @Column({type: "double"}) duracion?: number;
    @Column({type: "text"}) descripcion?: string;
    @Column() lugar?: string;
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

    @ManyToOne(() => User, usuario => usuario.events, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    user?: number;

    @OneToMany(() => Call, llamada => llamada.evento, {cascade: true})
    llamadas?: Call[];

    @OneToMany(() => Alert, alerta => alerta.evento, {cascade: true})
    alertas?: Alert[];

    @OneToMany(() => Message, mensaje => mensaje.evento, {cascade: true})
    mensajes?: Message[];

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
        this.user = props.usuario;
    }

  populateAlertasWithId() {
    this.alertas = this.alertas?.map(a => {
      a.evento = this.id_evento!;
      return a;
    })
  }
}
