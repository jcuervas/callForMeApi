import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Evento} from "./evento";
import {Mensaje} from "./mensaje";
import {Recordatorio} from "./recordatorio";
import {Llamada} from "./llamada";
import {Respuesta} from "./respuesta";
import {dateTimeTransformer} from "../util/constants";


@Entity({name: 'alertas'})
export class Alerta {
    @PrimaryGeneratedColumn({name: "id_alerta"})
    id_alerta?: number;

    @Column({
      type: "datetime",
      transformer: dateTimeTransformer
    }) fecha: Date;
    @Column() tipo: 'EVENTO'|'MENSAJE'|'LLAMADA';
    @Column({nullable: true}) duracion: number
    @Column({default: 0}) coste: number
    @Column() estado: string
    @Column({nullable: true}) uuid?: string
    @Column() num_intentos: number
    @Column({nullable: true}) destinatario?: string;

    @ManyToOne(() => Evento, evento => evento.alertas, {onDelete: "CASCADE", nullable: true})
    @JoinColumn({name: 'evento'})
    evento: Evento|number;

    @ManyToOne(() => Llamada, evento => evento.alertas, {onDelete: "CASCADE", nullable: true})
    @JoinColumn({name: 'llamada'})
    llamada: Llamada|number;

    @ManyToOne(() => Mensaje, mensaje => mensaje.alertas, {onDelete: "CASCADE", nullable: true})
    @JoinColumn({name: 'mensaje'})
    mensaje: Mensaje|number;


    @OneToMany(() => Recordatorio, recordatorio => recordatorio.alerta)
    recordatorios?: Recordatorio[];

    @OneToMany(() => Respuesta, respuesta => respuesta.alerta)
    respuestas?: Respuesta[];


    constructor(props: any = {}) {
        this.id_alerta = props.id_alerta;
        this.fecha = props.fecha;
        this.tipo = props.tipo;
        this.duracion = props.duracion;
        this.coste = props.coste;
        this.estado = props.estado;
        this.uuid = props.uuid;
        this.num_intentos = props.num_intentos;
        this.destinatario = props.destinatario;
        this.evento = props.evento;
        this.llamada = props.llamada;
        this.mensaje = props.mensaje;
    }
}
