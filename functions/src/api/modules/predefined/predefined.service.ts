import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Predefined} from "./predefined.entity";

@Injectable()
export class PredefinedService {

  constructor(@InjectRepository(Predefined) private repository: Repository<Predefined>) {
  }

  getRepository() {
    return this.repository
  }

}
