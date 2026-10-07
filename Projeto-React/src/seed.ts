import "dotenv/config";
import { AppDataSource } from "./data-source";
import { ProductCategory } from "./entities/ProductCategory";
import { ProductSituation } from "./entities/ProductSituation";
import { Situation } from "./entities/Situation";

// Script auxiliar para popular dados básicos utilizados no sistema.
async function seed(): Promise<void> {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  // Cria valores padrão para situações de usuário, caso ainda não existam.
  const situations = AppDataSource.getRepository(Situation);
  for (const nameSituation of ["Ativo", "Inativo"]) {
    if (!(await situations.findOneBy({ nameSituation }))) await situations.save({ nameSituation });
  }

  // Define categorias padrão para produtos que podem ser usados em cadastros iniciais.
  const categories = AppDataSource.getRepository(ProductCategory);
  for (const name of ["Geral", "Eletrônicos", "Alimentos"]) {
    if (!(await categories.findOneBy({ name }))) await categories.save({ name });
  }

  // Cria status de disponibilidade de produtos para o fluxo de cadastro.
  const productSituations = AppDataSource.getRepository(ProductSituation);
  for (const name of ["Disponível", "Indisponível"]) {
    if (!(await productSituations.findOneBy({ name }))) await productSituations.save({ name });
  }

  await AppDataSource.destroy();
  console.log("Dados iniciais inseridos.");
}

void seed().catch(async (error: unknown) => {
  console.error("Falha ao inserir dados iniciais:", error);
  if (AppDataSource.isInitialized) await AppDataSource.destroy();
  process.exitCode = 1;
});
