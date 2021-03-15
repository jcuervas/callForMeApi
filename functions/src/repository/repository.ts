import {Connection, ObjectLiteral, Repository, UpdateResult} from "typeorm";
import {EntityTarget} from "typeorm/common/EntityTarget";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

interface Relation {
  entity: any;
  name: string;
  condition: string;
}

interface FindParams {
  select?: string[];
  query?: ObjectLiteral;
  order?: ObjectLiteral;
  manyRelations?: Relation[];
  singleRelations?: Relation[];
  alias?: string;
  limit?: number;
}

export class BaseRepository<T> {
  repository: Repository<T>;

  constructor(conn: Connection, target: EntityTarget<T>) {
    this.repository = conn.getRepository(target)
  }

  getQueryBuilder(alias = 'a') {
    return this.repository.createQueryBuilder(alias)
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: string | number): Promise<T> {
    return this.repository.findOneOrFail(id);
  }

  findByQuery(params: FindParams): Promise<T|T[]> {
    const {select = [], query = {}, order = {}, manyRelations = [], singleRelations = [], alias = 'a', limit = 0} = params;
    const queryBuilder = this.repository.createQueryBuilder(alias);
    if (select.length) this.select(queryBuilder, select);
    this.andWhere(queryBuilder, query, alias);
    this.joinSingleRelations(queryBuilder, singleRelations, alias);
    this.joinManyRelations(queryBuilder, manyRelations, alias);
    this.orderBy(queryBuilder, order, alias);
    if (limit === 1) {
      return queryBuilder.getOneOrFail();
    }
    this.limit(queryBuilder, limit);
    return queryBuilder.getMany();
  }

  select(queryBuilder: SelectQueryBuilder<T>, select: string[]) {
    queryBuilder.select(select);
  }

  andWhere(queryBuilder: SelectQueryBuilder<T>, query: any = {}, alias = 'a') {
    Object.keys(query).forEach(q => {
      if (query[q]) {
        queryBuilder.andWhere(`${alias}.${q} = :${q}`).setParameter(q, query[q])
      }
    })
  }

  joinSingleRelations(queryBuilder: SelectQueryBuilder<T>, relations: Relation[], alias = 'a', map: 'map'|'select'|'none' = 'map') {
    relations.forEach(rel => {
      switch (map) {
        case "map":
          queryBuilder.leftJoinAndMapOne(`${alias}.${rel.name}`, rel.entity, rel.name, rel.condition);
          break;
        case "select":
          queryBuilder.leftJoinAndSelect(`${alias}.${rel.name}`, rel.name, rel.condition);
          break;
        case "none":
          queryBuilder.leftJoin(rel.entity, rel.name, rel.condition);
          break;
      }
    })
  }

  joinManyRelations(queryBuilder: SelectQueryBuilder<T>, relations: Relation[], alias = 'a') {
    relations.forEach(rel => {
      queryBuilder.leftJoinAndMapMany(`${alias}.${rel.name}`, rel.entity, rel.name, rel.condition);
    })
  }

  orderBy(queryBuilder: SelectQueryBuilder<T>, order: any = {}, alias = 'a') {
    Object.keys(order).forEach(o => {
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
