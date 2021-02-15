import {Connection, Repository, UpdateResult} from "typeorm";
import {EntityTarget} from "typeorm/common/EntityTarget";

export class BaseRepository<T> {
  repository: Repository<T>;

  constructor(conn: Connection, target: EntityTarget<T>) {
    this.repository = conn.getRepository(target)
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: string | number): Promise<T> {
    return this.repository.findOneOrFail(id);
  }

  findByQuery(query: any = {}, limit: number = 0): Promise<T[]> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    Object.keys(query).forEach(q => {
      if (query[q]) {
        queryBuilder.andWhere(`a.${q} = :value`).setParameter('value', query[q])
      }
    })
    if (limit) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getMany();
  }

  findOneByQuery(query: any = {}, relations: string[] = []): Promise<T> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    Object.keys(query).forEach(q => {
      queryBuilder.andWhere(`a.${q} = :${q}`).setParameter(q, query[q])
    })
    relations.forEach( rel => {
      queryBuilder.leftJoinAndSelect(`a.${rel}`, rel);
    });
    return queryBuilder.getOneOrFail();
  }

  async create(type: T): Promise<T> {
    return this.repository.save(type);
  }

  async update(type: T): Promise<T> {
    return this.repository.save(type);
  }

  async delete(type_id: string) {
    return this.repository.delete(type_id);
  }

  async deleteByQuery(query: any = {}) {
    const builder = this.repository.createQueryBuilder('a');
    Object.keys(query).forEach(q => {
      builder.andWhere(`a.${q} = ${query[q]}`)
    });
    return builder.delete();
  }

  async patch(id: string | number, body: any): Promise<UpdateResult> {
    return this.repository.update(id, body);
  }
}
