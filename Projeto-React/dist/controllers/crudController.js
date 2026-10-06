"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudController = crudController;
const crudService_1 = require("../services/crudService");
function crudController(repository, relations = [], requiredOnCreate = []) {
    const service = new crudService_1.CrudService(repository, relations);
    const relationIds = new Set(relations.map(({ idField }) => idField));
    const allowed = new Set(["name", "nameSituation", "email", ...relationIds]);
    const sendError = (error, res) => {
        const message = error instanceof Error ? error.message : "Erro inesperado";
        const status = /foreign key|cannot add or update|constraint/i.test(message) ? 400 : 500;
        res.status(status).json({ error: status === 400 ? "Referência inválida" : "Erro interno", detail: message });
    };
    const validateBody = (body) => {
        if (!body || typeof body !== "object" || Array.isArray(body))
            return null;
        const input = body;
        if (Object.keys(input).some((key) => !allowed.has(key)))
            return null;
        for (const key of ["name", "nameSituation", "email"]) {
            if (key in input && (typeof input[key] !== "string" || !input[key].trim()))
                return null;
        }
        for (const key of relationIds) {
            if (key in input && (!Number.isInteger(Number(input[key])) || Number(input[key]) < 1))
                return null;
        }
        return input;
    };
    const parseId = (value) => {
        const id = Number(value);
        return Number.isInteger(id) && id > 0 ? id : null;
    };
    return {
        list: async (req, res) => {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 10);
            if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
                return res.status(400).json({ error: "page deve ser >= 1 e limit deve estar entre 1 e 100" });
            }
            try {
                return res.json(await service.list(page, limit));
            }
            catch (error) {
                return sendError(error, res);
            }
        },
        get: async (req, res) => {
            const id = parseId(String(req.params.id));
            if (id === null)
                return res.status(400).json({ error: "ID deve ser um inteiro positivo" });
            try {
                const item = await service.find(id);
                return item ? res.json(item) : res.status(404).json({ error: "Registro não encontrado" });
            }
            catch (error) {
                return sendError(error, res);
            }
        },
        create: async (req, res) => {
            const input = validateBody(req.body);
            if (!input || !Object.keys(input).length)
                return res.status(400).json({ error: "Corpo inválido ou sem campos permitidos" });
            if (requiredOnCreate.some((field) => !(field in input)))
                return res.status(400).json({ error: `Campos obrigatórios: ${requiredOnCreate.join(", ")}` });
            try {
                return res.status(201).json(await service.create(input));
            }
            catch (error) {
                return sendError(error, res);
            }
        },
        update: async (req, res) => {
            const input = validateBody(req.body);
            if (!input || !Object.keys(input).length)
                return res.status(400).json({ error: "Corpo inválido ou sem campos permitidos" });
            const id = parseId(String(req.params.id));
            if (id === null)
                return res.status(400).json({ error: "ID deve ser um inteiro positivo" });
            try {
                const item = await service.find(id);
                return item ? res.json(await service.update(item, input)) : res.status(404).json({ error: "Registro não encontrado" });
            }
            catch (error) {
                return sendError(error, res);
            }
        },
        remove: async (req, res) => {
            const id = parseId(String(req.params.id));
            if (id === null)
                return res.status(400).json({ error: "ID deve ser um inteiro positivo" });
            try {
                const item = await service.find(id);
                if (!item)
                    return res.status(404).json({ error: "Registro não encontrado" });
                await service.remove(item);
                return res.status(204).send();
            }
            catch (error) {
                return sendError(error, res);
            }
        },
    };
}
//# sourceMappingURL=crudController.js.map