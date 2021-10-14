import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Call} from "./call.entity";

@Injectable()
export class CallService {

  constructor(@InjectRepository(Call) private repository: Repository<Call>) {
  }

  getRepository() {
    return this.repository
  }

}
