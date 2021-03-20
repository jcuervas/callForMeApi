import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";
import {Evento} from "./evento";
import {Alerta} from "./alerta";
import {timeUnit} from "../util/util";
import {dateTimeTransformer} from "../util/constants";

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
    @UpdateDateColumn() last_update?: Date;
    @Column() num_intentos?: number;

    @Column({type: 'varchar'}) storageUrl: string;

    @ManyToOne(() => Evento, evento => evento.llamadas, {onDelete: "CASCADE"})
    @JoinColumn({name: 'evento'})
    evento?: number;

    @ManyToOne(() => Usuario, usuario => usuario.llamadas, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario?: number|Usuario;

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
        this.storageUrl = props.storageUrl;
        this.evento = props.evento;
        this.usuario = props.usuario;
    }

  populateAlertasWithId() {
    this.alertas = this.alertas?.map(a => {
      a.llamada = this.id_llamada!;
      return a;
    })
  }
}
