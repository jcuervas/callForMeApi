import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user";

@Entity({name: 'predefinidos'})
export class Predefined {
    @PrimaryGeneratedColumn({name: "id_predefinido"})
    id_predefinido?: number;
    @Column() nombre: string;
    @Column({type: "text"}) texto: string;
    @Column() peso: string;
    @UpdateDateColumn() last_update?: Date;

    @ManyToOne(() => User, usuario => usuario.predefinidos, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    user: number;

    constructor(props: any = {}) {
        this.id_predefinido = props.id_predefinido;
        this.nombre = props.nombre;
        this.texto = props.texto;
        this.peso = props.peso;
        this.user = props.usuario;
    }
}
