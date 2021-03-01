import {Connection, Repository, UpdateResult} from "typeorm";
import {EntityTarget} from "typeorm/common/EntityTarget";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

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

  findByQuery(query: any = {}, limit: number = 0, order: any = {}, relations: string[] = []): Promise<T[]> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    this.andWhere(queryBuilder, query);
    this.joinRelations(queryBuilder, relations);
    this.orderBy(queryBuilder, order);
    this.limit(queryBuilder, limit);
    return queryBuilder.getMany();
  }

  findOneByQuery(query: any = {}, order: any = {}, relations: string[] = []): Promise<T> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    this.andWhere(queryBuilder, query);
    this.joinRelations(queryBuilder, relations);
    this.orderBy(queryBuilder, order);
    return queryBuilder.getOneOrFail();
  }

  andWhere(queryBuilder: SelectQueryBuilder<T>, query: any= {}, alias = 'a') {
    Object.keys(query).forEach(q => {
      if (query[q]) {
        queryBuilder.andWhere(`${alias}.${q} = :${q}`).setParameter(q, query[q])
      }
    })
  }

  joinRelations(queryBuilder: SelectQueryBuilder<T>, relations: string[], alias = 'a') {
    relations.forEach( rel => {
      queryBuilder.leftJoinAndSelect(`${alias}.${rel}`, rel);
    })
  }

  orderBy(queryBuilder: SelectQueryBuilder<T>, order: any = {}, alias = 'a') {
    Object.keys(order).forEach( o => {
      queryBuilder.orderBy(`${alias}.${o}`, order[o])
    });
  }

  limit(queryBuilder: SelectQueryBuilder<T>, limit: number = 0) {
    if (limit) {
      queryBuilder.take(limit);
    }
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
