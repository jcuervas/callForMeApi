import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Llamada} from "../../../entity/llamada";
import {Borrado} from "../../../entity/borrado";
import {Alerta} from "../../../entity/alerta";
import {MAX_ALERTAS} from "../../../entity/mensaje";
import {v4 as uuidv4} from "uuid";
import {OFFSET, Recordatorio} from "../../../entity/recordatorio";
import util from "../../../util/util";
import {format, isBefore} from "date-fns";
import useXML from "../../../services/useXML";
import useStorage from "../../../services/useStorage";

export class LlamadasController {

  async get(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const {usuario, llamada} = req.query;
    let llamadas: Llamada[];
    if (usuario || llamada) {
      const alias = 'll';
      llamadas = (await llamadaRepository.findByQuery({
        query: {usuario},
        manyRelations: [{entity: Alerta, name: 'alertas', condition: 'alertas.llamada = ll.id_llamada'}],
        alias
      })) as Llamada[]
    } else {
      llamadas = await llamadaRepository.findAll();
    }
    llamadas = llamadas.map(ll => {
      ll.populateAlertasWithId();
      return ll;
    })
    return res.json({llamadas});
  }

  async getById(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const {id} = req.params;
    let llamada: Llamada;
    llamada = await llamadaRepository.findById(id);
    return res.json(llamada);
  }

  async post(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const alertaRepository = new BaseRepository(connection, Alerta);
    const recordatorioRepository = new BaseRepository(connection, Recordatorio);
    const llamada = new Llamada(req.body);


    let maxAlerts = 0;
    let fechaFin: Date | null = null;
    if (llamada.unidad_repeticion && llamada.cantidad_repeticion && llamada.fecha_fin) {
      fechaFin = llamada.fecha_fin;
    }
    let fechaAlerta = llamada.fecha_ini;
    await llamadaRepository.create(llamada);

    while (maxAlerts < MAX_ALERTAS) {
      const alerta = await alertaRepository.create(new Alerta({
        tipo: "LLAMADA",
        fecha: fechaAlerta,
        llamada: llamada.id_llamada,
        num_intentos: 0,
        estado: 'PROGRAMADA',
        destinatario: llamada.destinatario,
        uuid: uuidv4()
      }));

      const recordatorio = new Recordatorio({
        tipo: "ALARMA",
        tiempo_offset: OFFSET.llamada.negative,
        alerta: alerta.id_alerta
      });
      await recordatorioRepository.create(recordatorio);
      if (!llamada.alertas) llamada.alertas = [];
      if (!alerta.recordatorios) alerta.recordatorios = [];
      alerta.recordatorios.push(recordatorio);
      llamada.alertas.push(alerta);
      const callName = `call_${llamada.id_llamada}_${llamada.destinatario}_${format(new Date(), 'dd-MM-yyyy')}.xml`
      llamada.storageUrl = await useStorage.uploadObjectToBucket('assets/calls', callName, useXML.getPlivoCallXML(alerta.id_alerta!, llamada))

      if (fechaFin) {
        fechaAlerta = util.getNextDate(fechaAlerta, llamada.cantidad_repeticion!, llamada.unidad_repeticion!, 0);
        if (!isBefore(fechaAlerta, fechaFin)) {
          break;
        }
      } else {
        break;
      }
      maxAlerts++;
    }
    llamada.populateAlertasWithId();
    return res.json(llamada);
  }

  async put(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const llamada = new Llamada(req.body);
    return res.json(await llamadaRepository.update(llamada));
  }

  async patch(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    return res.json(await llamadaRepository.patch(req.params.id, req.body));
  }

  async delete(req: any, res: any) {
    const connection = await connect();
    const llamadaRepository = new BaseRepository(connection, Llamada);
    const borradosRepository = new BaseRepository(connection, Borrado);
    const id = req.params.id;
    const llamada = await llamadaRepository.findById(id);
    await llamadaRepository.delete(id);
    await borradosRepository.create(new Borrado({
      tabla: 'Llamadas',
      usuario: llamada.usuario,
      id_elemento: id,
      fecha: new Date()
    }))
    return res.send();
  }
}
