import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity({name: 'predefinidos'})
export class Predefinido {
    @PrimaryGeneratedColumn({name: "id_predefinido"})
    id_predefinido?: number;
    @Column() nombre: string;
    @Column({type: "text"}) texto: string;
    @Column() peso: string;
    @UpdateDateColumn() last_update?: Date;

    @ManyToOne(() => Usuario, usuario => usuario.predefinidos)
    @JoinColumn({name: 'usuario'})
    usuario: number;

    constructor(props: any = {}) {
        this.id_predefinido = props.id_predefinido;
        this.nombre = props.nombre;
        this.texto = props.texto;
        this.peso = props.peso;
        this.usuario = props.usuario;
    }
}