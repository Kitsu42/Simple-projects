import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProductCategory } from "./entities/ProductCategory";
import { ProductSituation } from "./entities/ProductSituation";
import { Product } from "./entities/Product";
import { Situation } from "./entities/Situation";
import { User } from "./entities/User";
import { InitialSchema1710000000000 } from "./migrations/InitialSchema";

const dialect = process.env.DB_DIALECT ?? "mysql";
if (dialect !== "mysql") throw new Error("Este projeto está configurado para MySQL (DB_DIALECT=mysql).");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "nodeapi",
  synchronize: false,
  logging: process.env.DB_LOGGING === "true",
  entities: [ProductCategory, ProductSituation, Product, Situation, User],
  migrations: [InitialSchema1710000000000],
});
