import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export interface RelationInput { field: string; idField: string }

// Camada de serviço genérica para consultas e persistência no banco.
export class CrudService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>, private readonly relations: RelationInput[] = []) {}

  // Lista itens em páginas com paginação e carregamento de relações.
  async list(page: number, limit: number) {
    const [data, total] = await this.repository.findAndCount({
      relations: this.relations.map(({ field }) => ({ [field]: true })) as never,
      skip: (page - 1) * limit, take: limit, order: { id: "ASC" } as never,
    });
    return { data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  // Busca um registro pelo ID, incluindo as relações configuradas.
  find(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as never, relations: this.relations.map(({ field }) => ({ [field]: true })) as never });
  }

  // Cria um novo registro e converte IDs em objetos relacionados quando necessário.
  async create(input: Record<string, unknown>): Promise<T> {
    return this.repository.save(this.repository.create(this.withRelations(input) as DeepPartial<T>));
  }

  // Atualiza um registro preservando os dados antigos e substituindo os campos enviados.
  async update(entity: T, input: Record<string, unknown>): Promise<T> {
    return this.repository.save(this.repository.merge(entity, this.withRelations(input) as DeepPartial<T>));
  }

  // Remove um registro do banco.
  remove(entity: T): Promise<T> { return this.repository.remove(entity); }

  // Converte campos tipo "situationId" em objetos do tipo "situation" para o TypeORM.
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
