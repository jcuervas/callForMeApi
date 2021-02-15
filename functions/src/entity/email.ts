import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "./usuario";
import {Mensaje} from "./mensaje";

@Entity({name: 'emails'})
export class Email {
    @PrimaryGeneratedColumn({name: "id_email"})
    id_email?: number;
    @Column() direccion: string;
    @Column() estado: 'NO_CONFIRMADO'|'ACTIVADO';
    @Column({default: ''}) identificador: string;
    @UpdateDateColumn() last_update?: Date;

    @ManyToOne(() => Usuario, usuario => usuario.emails, {onDelete: "CASCADE"})
    @JoinColumn({name: 'usuario'})
    usuario: number;

    @OneToMany(() => Mensaje, mensaje => mensaje.email)
    mensajes?: Mensaje[];


    constructor(props: any = {}) {
        this.id_email = props.id_email;
        this.direccion = props.direccion;
        this.estado = props.estado;
        this.identificador = props.identificador;
        this.usuario = props.usuario;
    }

}
