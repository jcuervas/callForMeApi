import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {Usuario} from "../../../entity/usuario";
import stripeService from "../../../services/stripeService";

export class StripeController {


  async ephemeralKeys(req: any, res: any) {
    const connection = await connect();
    const userRepository = new BaseRepository(connection, Usuario);
    const {id_usuario, api_version} = req.query;
    const user = await userRepository.findById(id_usuario);
    return res.json(await stripeService.getEphemeralKeys(user, api_version));
  }


  async charge(req: any, res: any) {
    const connection = await connect();
    const userRepository = new BaseRepository(connection, Usuario);
    const {id_usuario, amount, currency, source} = req.query;
    const user = await userRepository.findById(id_usuario);
    const charge = await stripeService.charge(user, currency, amount, source);
    user.credito += amount/100;
    await userRepository.update(user);
    return res.json(charge);
  }

}
