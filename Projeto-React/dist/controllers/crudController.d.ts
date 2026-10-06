import { Request, Response } from "express";
import { ObjectLiteral, Repository } from "typeorm";
import { RelationInput } from "../services/crudService";
export declare function crudController<T extends ObjectLiteral>(repository: Repository<T>, relations?: RelationInput[], requiredOnCreate?: string[]): {
    list: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    get: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    remove: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
};
//# sourceMappingURL=crudController.d.ts.map