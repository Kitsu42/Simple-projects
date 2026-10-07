"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
// Cria a instância do servidor Express e habilita o parse de JSON.
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Centraliza todas as rotas da aplicação sob o prefixo /api.
app.use("/api", routes_1.default);
const port = Number(process.env.PORT ?? 8080);
// Inicializa a conexão com o banco e aplica as migrations antes de abrir a API.
async function start() {
    try {
        await data_source_1.AppDataSource.initialize();
        await data_source_1.AppDataSource.runMigrations();
        app.listen(port, () => console.log(`API disponível em http://localhost:${port}/api`));
    }
    catch (error) {
        console.error("Não foi possível iniciar a API:", error);
        process.exitCode = 1;
    }
}
void start();
//# sourceMappingURL=index.js.map