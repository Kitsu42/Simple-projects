import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export interface RelationInput { field: string; idField: string }

export class CrudService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>, private readonly relations: RelationInput[] = []) {}

  async list(page: number, limit: number) {
    const [data, total] = await this.repository.findAndCount({
      relations: this.relations.map(({ field }) => ({ [field]: true })) as never,
      skip: (page - 1) * limit, take: limit, order: { id: "ASC" } as never,
    });
    return { data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  find(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as never, relations: this.relations.map(({ field }) => ({ [field]: true })) as never });
  }

  async create(input: Record<string, unknown>): Promise<T> {
    return this.repository.save(this.repository.create(this.withRelations(input) as DeepPartial<T>));
  }

  async update(entity: T, input: Record<string, unknown>): Promise<T> {
    return this.repository.save(this.repository.merge(entity, this.withRelations(input) as DeepPartial<T>));
  }

  remove(entity: T): Promise<T> { return this.repository.remove(entity); }

  private withRelations(input: Record<string, unknown>): Record<string, unknown> {
    const result = { ...input };
    for (const { field, idField } of this.relations) {
      if (Object.hasOwn(result, idField)) {
        const id = Number(result[idField]);
        delete result[idField];
        result[field] = Number.isInteger(id) && id > 0 ? { id } : null;
      }
    }
    return result;
  }
}
