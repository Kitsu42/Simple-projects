import { ObjectLiteral, Repository } from "typeorm";
export interface RelationInput {
    field: string;
    idField: string;
}
export declare class CrudService<T extends ObjectLiteral> {
    private readonly repository;
    private readonly relations;
    constructor(repository: Repository<T>, relations?: RelationInput[]);
    list(page: number, limit: number): Promise<{
        data: T[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    find(id: number): Promise<T | null>;
    create(input: Record<string, unknown>): Promise<T>;
    update(entity: T, input: Record<string, unknown>): Promise<T>;
    remove(entity: T): Promise<T>;
    private withRelations;
}
//# sourceMappingURL=crudService.d.ts.map