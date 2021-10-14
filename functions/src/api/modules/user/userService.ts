import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";

export class UserService {

  constructor(@InjectRepository(User) private repository: Repository<User>) {
  }

  getRepository() {
    return this.repository
  }
}
