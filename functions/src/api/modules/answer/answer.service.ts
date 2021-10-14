import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Answer} from "./answer.entity";

@Injectable()
export class AnswerService {

  constructor(@InjectRepository(Answer) private repository: Repository<Answer>) {
  }

  getRepository() {
    return this.repository
  }

}
