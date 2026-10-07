import { Router } from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entities/ProductCategory";
import { ProductSituation } from "../entities/ProductSituation";
import { Product } from "../entities/Product";
import { Situation } from "../entities/Situation";
import { User } from "../entities/User";
import { crudController } from "../controllers/crudController";

const router = Router();

// Rota raiz para verificar se a API respondeu corretamente.
router.get("/", (_req, res) => res.json({ name: "Simple Projects API", status: "online" }));

// Cria as rotas CRUD de forma genérica para cada entidade, evitando repetição de código.
function mount(path: string, entity: typeof ProductCategory | typeof ProductSituation | typeof Product | typeof Situation | typeof User, relations: { field: string; idField: string }[] = [], required: string[] = []) {
  const controller = crudController(AppDataSource.getRepository(entity), relations, required);
  router.get(`/${path}`, controller.list);
  router.get(`/${path}/:id`, controller.get);
  router.post(`/${path}`, controller.create);
  router.patch(`/${path}/:id`, controller.update);
  router.delete(`/${path}/:id`, controller.remove);
}

// Cada mount define um recurso REST com seus campos exigidos e relações carregadas.
mount("situations", Situation, [], ["nameSituation"]);
mount("users", User, [{ field: "situation", idField: "situationId" }], ["name", "email", "situationId"]);
mount("product-categories", ProductCategory, [], ["name"]);
mount("product-situations", ProductSituation, [], ["name"]);
mount("products", Product, [
  { field: "productSituation", idField: "productSituationId" },
  { field: "productCategory", idField: "productCategoryId" },
], ["name", "productSituationId", "productCategoryId"]);

export default router;
