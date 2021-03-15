import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "./usuario";
import {dateTimeTransformer} from "../util/constants";

@Entity({name: 'borrados'})
export class Borrado {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({name: "id_elemento"})
    id_elemento?: number;

    @CreateDateColumn({
      type: "datetime",
      transformer: dateTimeTransformer
    }) fecha?: Date;
    @Column() tabla?: string;

    @ManyToOne(() => Usuario, usuario => usuario.borrados, {onDelete: "CASCADE"})
    @JoinColumn({name: "usuario"})
    usuario?: number;

    constructor(props: any = {}) {
        this.id_elemento = props.id_elemento;
        this.tabla = props.tabla;
        this.usuario = props.usuario;
    }
}
