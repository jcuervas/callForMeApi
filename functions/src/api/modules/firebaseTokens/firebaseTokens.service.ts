import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {FirebaseToken} from "./firebaseToken.entity";

@Injectable()
export class FirebaseTokensService {

  constructor(@InjectRepository(FirebaseToken) private repository: Repository<FirebaseToken>) {
  }

  getRepository() {
    return this.repository
  }

}
