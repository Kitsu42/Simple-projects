"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
class CrudService {
    repository;
    relations;
    constructor(repository, relations = []) {
        this.repository = repository;
        this.relations = relations;
    }
    async list(page, limit) {
        const [data, total] = await this.repository.findAndCount({
            relations: this.relations.map(({ field }) => ({ [field]: true })),
            skip: (page - 1) * limit, take: limit, order: { id: "ASC" },
        });
        return { data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    find(id) {
        return this.repository.findOne({ where: { id }, relations: this.relations.map(({ field }) => ({ [field]: true })) });
    }
    async create(input) {
        return this.repository.save(this.repository.create(this.withRelations(input)));
    }
    async update(entity, input) {
        return this.repository.save(this.repository.merge(entity, this.withRelations(input)));
    }
    remove(entity) { return this.repository.remove(entity); }
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