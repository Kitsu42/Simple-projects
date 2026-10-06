"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ProductCategory_1 = require("./entities/ProductCategory");
const ProductSituation_1 = require("./entities/ProductSituation");
const Product_1 = require("./entities/Product");
const Situation_1 = require("./entities/Situation");
const User_1 = require("./entities/User");
const InitialSchema_1 = require("./migrations/InitialSchema");
const dialect = process.env.DB_DIALECT ?? "mysql";
if (dialect !== "mysql")
    throw new Error("Este projeto está configurado para MySQL (DB_DIALECT=mysql).");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "nodeapi",
    synchronize: false,
    logging: process.env.DB_LOGGING === "true",
    entities: [ProductCategory_1.ProductCategory, ProductSituation_1.ProductSituation, Product_1.Product, Situation_1.Situation, User_1.User],
    migrations: [InitialSchema_1.InitialSchema1710000000000],
});
//# sourceMappingURL=data-source.js.map