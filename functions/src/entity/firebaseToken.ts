import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Usuario} from "./usuario";

@Entity({name: 'firebase_tokens'})
export class FirebaseToken {
    @PrimaryColumn() device: string;

    @ManyToOne(() => Usuario,usuario => usuario.firebaseTokens, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: 'usuario'})
    usuario?: number;

    @Column()
    token: string;

    constructor(props: any = {}) {
        this.usuario = props.usuario ? props.usuario : null;
        this.token = props.token;
        this.device = props.device;
    }
}
