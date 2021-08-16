import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./user";

@Entity({name: 'firebase_tokens'})
export class FirebaseToken {
    @PrimaryColumn() device: string;

    @ManyToOne(() => User, usuario => usuario.firebaseTokens, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: 'usuario'})
    user?: number;

    @Column()
    token: string;

    constructor(props: any = {}) {
        this.user = props.usuario ? props.usuario : null;
        this.token = props.token;
        this.device = props.device;
    }
}
