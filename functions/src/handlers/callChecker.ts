import {NUM_CALLS_PER_SEC} from "../util/constants";
import {BaseRepository} from "../repository/repository";
import {Alerta} from "../entity/alerta";
import {Llamada} from "../entity/llamada";
import {connect} from "../services/connection";
import util from "../util/util";

export class CallChecker {

    static async handle() {
        const connection = await connect();
        const alertaRepository = new BaseRepository(connection, Alerta);
        const llamadaRepository = new BaseRepository(connection, Llamada);
        let numCallsFired = 0;
        let hasMore = false;
        while (numCallsFired < NUM_CALLS_PER_SEC * 50) {
            const queryBuilder = alertaRepository.repository.createQueryBuilder('a');
            const alertas = await queryBuilder.select('a.id_alerta, a.fecha, a.destinatario, a.llamada')
                .where('date(a.fecha) <= date(NOW())')
                .andWhere('a.estado = PROGRAMADA AND a.tipo = LLAMADA')
                .take(NUM_CALLS_PER_SEC)
                .getMany();
            for (const alerta of alertas) {
                hasMore = true;
                numCallsFired++;
                //CronService.putEvent(alerta.fecha, alerta.id_alerta!);

                await alertaRepository.patch(alerta.id_alerta!, {estado: 'ENVIADA'});
                await llamadaRepository.patch(alerta.llamada, {last_update: new Date()});
                util.sleep(1);
            }
            if (!hasMore) {
                break;
            }
        }
    }

}
