import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Message} from "./message.entity";

@Injectable()
export class MessageService {

  constructor(@InjectRepository(Message) private repository: Repository<Message>) {
  }

  getRepository() {
    return this.repository
  }

}
