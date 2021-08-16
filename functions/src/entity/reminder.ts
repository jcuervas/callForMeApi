import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Alert} from "./alert";

export const OFFSET = {
    mensaje: {
        positive: 5,
        negative: -5
    },
    llamada: {
        positive: 5,
        negative: -5
    }
}

@Entity({name: 'recordatorios'})
export class Reminder {

    @PrimaryGeneratedColumn({name: "id_recordatorio"})
    id_recordatorio?: number;
    @Column() tipo: string;
    @Column() tiempo_offset: number;

    @ManyToOne(() => Alert, alerta => alerta.recordatorios, {onDelete: "CASCADE"})
    @JoinColumn({name: 'alerta'})
    alerta: number;

    constructor(props: any = {}) {
        this.id_recordatorio = props.id_recordatorio;
        this.tipo = props.tipo;
        this.tiempo_offset = props.tiempo_offset;
        this.alerta = props.alerta;
    }

}