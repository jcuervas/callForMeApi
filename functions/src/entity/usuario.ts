import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import {Llamada} from "./llamada";
import {Borrado} from "./borrado";
import {Respuesta} from "./respuesta";
import {Predefinido} from "./predefinido";
import {Evento} from "./evento";
import {Email} from "./email";
import {Mensaje} from "./mensaje";
import {ConfirmationToken} from "./confirmationToken";

@Entity({name: 'usuarios'})
@Unique(["username"])
@Unique(["telefono"])
export class Usuario {
  @PrimaryGeneratedColumn({name: "id_usuario"})
  id_usuario?: number;

  @Column() nombre: string;
  @Column() apellidos: string;
  @Column() telefono: string;
  @Column() username: string;
  @Column() password: string;
  @Column({default: 'NO_CONFIRMADO'}) estado: 'PHONE_CONFIRMED' | 'NO_CONFIRMADO';
  @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"}) fecha_alta: Date;
  @Column({type: "double", default: 0}) credito: number;
  @Column({type: "varchar", length: 4}) registration_pin: string;
  @Column({type: "varchar", length: 45}) stripe_id: string;
  @UpdateDateColumn() last_update?: Date;
  @Column() cod_pais: string;
  @Column() timezone: string;
  @Column({default: 3}) num_intentos: number;

  @OneToMany(() => Llamada, llamada => llamada.usuario)
  llamadas?: Llamada[];

  @OneToMany(() => Borrado, borrado => borrado.usuario)
  borrados?: Borrado[];

  @OneToMany(() => Respuesta, respuesta => respuesta.alerta)
  respuestas?: Respuesta[];

  @OneToMany(() => Predefinido, predefinido => predefinido.usuario)
  predefinidos?: Predefinido[];

  @OneToMany(() => Evento, evento => evento.usuario)
  eventos?: Evento[];

  @OneToMany(() => Email, email => email.usuario, {cascade: true})
  emails?: Email[];

  @OneToMany(() => Mensaje, mensaje => mensaje.email)
  mensajes?: Mensaje[];

  @OneToMany(() => ConfirmationToken, confirmationToken => confirmationToken.usuario)
  @JoinColumn() confirmationTokens?: ConfirmationToken[];


  constructor(props: any = {}) {
    this.id_usuario = props.id_usuario;
    this.nombre = props.nombre;
    this.apellidos = props.apellidos;
    this.telefono = props.telefono;
    this.username = props.username;
    this.password = props.password;
    this.estado = props.estado;
    this.fecha_alta = props.fecha_alta;
    this.credito = props.credito;
    this.registration_pin = props.registration_pin;
    this.stripe_id = props.stripe_id;
    this.cod_pais = props.cod_pais;
    this.timezone = props.timezone;
    this.num_intentos = props.num_intentos;
  }

}
