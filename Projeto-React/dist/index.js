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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
const port = Number(process.env.PORT ?? 8080);
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