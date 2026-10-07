"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
// Camada de serviço genérica para consultas e persistência no banco.
class CrudService {
    repository;
    relations;
    constructor(repository, relations = []) {
        this.repository = repository;
        this.relations = relations;
    }
    // Lista itens em páginas com paginação e carregamento de relações.
    async list(page, limit) {
        const [data, total] = await this.repository.findAndCount({
            relations: this.relations.map(({ field }) => ({ [field]: true })),
            skip: (page - 1) * limit, take: limit, order: { id: "ASC" },
        });
        return { data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    // Busca um registro pelo ID, incluindo as relações configuradas.
    find(id) {
        return this.repository.findOne({ where: { id }, relations: this.relations.map(({ field }) => ({ [field]: true })) });
    }
    // Cria um novo registro e converte IDs em objetos relacionados quando necessário.
    async create(input) {
        return this.repository.save(this.repository.create(this.withRelations(input)));
    }
    // Atualiza um registro preservando os dados antigos e substituindo os campos enviados.
    async update(entity, input) {
        return this.repository.save(this.repository.merge(entity, this.withRelations(input)));
    }
    // Remove um registro do banco.
    remove(entity) { return this.repository.remove(entity); }
    // Converte campos tipo "situationId" em objetos do tipo "situation" para o TypeORM.
    withRelations(input) {
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
exports.CrudService = CrudService;
//# sourceMappingURL=crudService.js.map