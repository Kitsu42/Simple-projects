"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const data_source_1 = require("./data-source");
const ProductCategory_1 = require("./entities/ProductCategory");
const ProductSituation_1 = require("./entities/ProductSituation");
const Situation_1 = require("./entities/Situation");
// Script auxiliar para popular dados básicos utilizados no sistema.
async function seed() {
    await data_source_1.AppDataSource.initialize();
    await data_source_1.AppDataSource.runMigrations();
    // Cria valores padrão para situações de usuário, caso ainda não existam.
    const situations = data_source_1.AppDataSource.getRepository(Situation_1.Situation);
    for (const nameSituation of ["Ativo", "Inativo"]) {
        if (!(await situations.findOneBy({ nameSituation })))
            await situations.save({ nameSituation });
    }
    // Define categorias padrão para produtos que podem ser usados em cadastros iniciais.
    const categories = data_source_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
    for (const name of ["Geral", "Eletrônicos", "Alimentos"]) {
        if (!(await categories.findOneBy({ name })))
            await categories.save({ name });
    }
    // Cria status de disponibilidade de produtos para o fluxo de cadastro.
    const productSituations = data_source_1.AppDataSource.getRepository(ProductSituation_1.ProductSituation);
    for (const name of ["Disponível", "Indisponível"]) {
        if (!(await productSituations.findOneBy({ name })))
            await productSituations.save({ name });
    }
    await data_source_1.AppDataSource.destroy();
    console.log("Dados iniciais inseridos.");
}
void seed().catch(async (error) => {
    console.error("Falha ao inserir dados iniciais:", error);
    if (data_source_1.AppDataSource.isInitialized)
        await data_source_1.AppDataSource.destroy();
    process.exitCode = 1;
});
//# sourceMappingURL=seed.js.map