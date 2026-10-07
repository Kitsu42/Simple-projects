import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source";
import apiRouter from "./routes";

// Cria a instância do servidor Express e habilita o parse de JSON.
const app = express();
app.use(express.json());

// Centraliza todas as rotas da aplicação sob o prefixo /api.
app.use("/api", apiRouter);

const port = Number(process.env.PORT ?? 8080);

// Inicializa a conexão com o banco e aplica as migrations antes de abrir a API.
async function start(): Promise<void> {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    app.listen(port, () => console.log(`API disponível em http://localhost:${port}/api`));
  } catch (error) {
    console.error("Não foi possível iniciar a API:", error);
    process.exitCode = 1;
  }
}

void start();
