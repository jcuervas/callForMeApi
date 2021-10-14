import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Event} from "./event.entity";

@Injectable()
export class EventService {

  constructor(@InjectRepository(Event) private repository: Repository<Event>) {
  }

  getRepository() {
    return this.repository
  }

}
