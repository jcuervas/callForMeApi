import {errorHandler} from "../services/errorHandler";
import {API_KEY} from "../services/security.service";
import {AlertasModule} from "./modules/alertas/alertas.module";
import {BorradosModule} from "./modules/borrados/borrados.module";
import {UsuariosModule} from "./modules/usuario/usuario.module";
import {ConfiguracionesModule} from "./modules/configuraciones/configuraciones.module";
import {LlamadasModule} from "./modules/llamadas/llamadas.module";
import {AuthModule} from "./modules/auth/auth.module";
import {MensajesModule} from "./modules/mensajes/mensajes.module";
import {EventosModule} from "./modules/eventos/eventos.module";
import {EmailsModule} from "./modules/emails/emails.module";
import {RespuestasModule} from "./modules/respuestas/respuestas.module";
import {PlivoModule} from "./modules/plivo/plivo.module";
import {PredefinidosModule} from "./modules/predefinidos/predefinidos.module";

const express = require('express');
const cors = require('cors');

class App {
    app: any;

    constructor() {
        this.app = express();
        this.config();
        this.initModules();
    }

    private config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        const corsOptions = {
            origin: true,
        }
        this.app.use(cors(corsOptions));
        this.app.use(errorHandler);
        this.app.set('api_key', API_KEY);

    }

    private initModules() {
        new AuthModule(this.app);
        new AlertasModule(this.app);
        new BorradosModule(this.app);
        new RespuestasModule(this.app);
        new UsuariosModule(this.app);
        new ConfiguracionesModule(this.app);
        new LlamadasModule(this.app);
        new MensajesModule(this.app);
        new EventosModule(this.app);
        new EmailsModule(this.app);
        new PlivoModule(this.app);
        new PredefinidosModule(this.app);
    }
}

export default new App();
