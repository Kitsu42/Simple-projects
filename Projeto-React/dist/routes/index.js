"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const ProductCategory_1 = require("../entities/ProductCategory");
const ProductSituation_1 = require("../entities/ProductSituation");
const Product_1 = require("../entities/Product");
const Situation_1 = require("../entities/Situation");
const User_1 = require("../entities/User");
const crudController_1 = require("../controllers/crudController");
const router = (0, express_1.Router)();
// Rota raiz para verificar se a API respondeu corretamente.
router.get("/", (_req, res) => res.json({ name: "Simple Projects API", status: "online" }));
// Cria as rotas CRUD de forma genérica para cada entidade, evitando repetição de código.
function mount(path, entity, relations = [], required = []) {
    const controller = (0, crudController_1.crudController)(data_source_1.AppDataSource.getRepository(entity), relations, required);
    router.get(`/${path}`, controller.list);
    router.get(`/${path}/:id`, controller.get);
    router.post(`/${path}`, controller.create);
    router.patch(`/${path}/:id`, controller.update);
    router.delete(`/${path}/:id`, controller.remove);
}
// Cada mount define um recurso REST com seus campos exigidos e relações carregadas.
mount("situations", Situation_1.Situation, [], ["nameSituation"]);
mount("users", User_1.User, [{ field: "situation", idField: "situationId" }], ["name", "email", "situationId"]);
mount("product-categories", ProductCategory_1.ProductCategory, [], ["name"]);
mount("product-situations", ProductSituation_1.ProductSituation, [], ["name"]);
mount("products", Product_1.Product, [
    { field: "productSituation", idField: "productSituationId" },
    { field: "productCategory", idField: "productCategoryId" },
], ["name", "productSituationId", "productCategoryId"]);
exports.default = router;
//# sourceMappingURL=index.js.map