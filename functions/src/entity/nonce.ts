import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity({name: 'nonces'})
export class Nonce {
    @PrimaryColumn({name: 'usuario'})
    @OneToOne(() => Usuario)
    @JoinColumn({name: 'usuario'})
    usuario: number;

    @Column({nullable: false})
    nonce: string;

    constructor(props: any = {}) {
        this.usuario = props.usuario;
        this.nonce = props.nonce;
    }
}