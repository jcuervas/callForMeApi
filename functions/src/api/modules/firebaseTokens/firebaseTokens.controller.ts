import {connect} from "../../../services/connection";
import {BaseRepository} from "../../../repository/repository";
import {FirebaseToken} from "../../../entity/firebaseToken";

export class FirebaseTokensController {

    async get(req: any, res: any) {
        const connection = await connect();
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        const {token, usuario, device} = req.query;
        let firebaseTokens: FirebaseToken|FirebaseToken[] = [];
        if (token || usuario || device) {
            firebaseTokens = await firebaseTokensRepository.findByQuery({token, usuario, device})
        }
        return res.json({firebaseTokens});
    }

    async post(req: any, res: any) {
        const connection = await connect();
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        const firebaseTokens = new FirebaseToken(req.body);
        return res.json(await firebaseTokensRepository.create(firebaseTokens));
    }

    async put(req: any, res: any) {
        const connection = await connect();
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        const firebaseToken = new FirebaseToken(req.body);
        return res.json(await firebaseTokensRepository.update(firebaseToken));
    }

    async patch(req: any, res: any) {
        const connection = await connect();
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        return res.json(await firebaseTokensRepository.patch(req.params.device, req.body));
    }

    async delete(req: any, res: any) {
        const connection = await connect();
        const firebaseTokensRepository = new BaseRepository(connection, FirebaseToken);
        const device = req.params.device;
        await firebaseTokensRepository.delete(device);
        return res.send();
    }
}
