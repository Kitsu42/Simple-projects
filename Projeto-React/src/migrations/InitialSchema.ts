import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitialSchema1710000000000 implements MigrationInterface {
  name = "InitialSchema1710000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({ name: "situations", columns: [
      { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
      { name: "nameSituation", type: "varchar", length: "255" },
      { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
      { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
    ] }));
    await queryRunner.createTable(new Table({ name: "product_categories", columns: [
      { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
      { name: "name", type: "varchar", length: "255" },
      { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
      { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
    ] }));
    await queryRunner.createTable(new Table({ name: "product_situations", columns: [
      { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
      { name: "name", type: "varchar", length: "255" },
      { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
      { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
    ] }));
    await queryRunner.createTable(new Table({ name: "users", columns: [
      { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
      { name: "name", type: "varchar", length: "255" },
      { name: "email", type: "varchar", length: "255" },
      { name: "situationId", type: "int" },
      { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
      { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
    ], foreignKeys: [{ columnNames: ["situationId"], referencedTableName: "situations", referencedColumnNames: ["id"], onDelete: "RESTRICT" }] }));
    await queryRunner.createTable(new Table({ name: "products", columns: [
      { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
      { name: "name", type: "varchar", length: "255" },
      { name: "productSituationId", type: "int" },
      { name: "productCategoryId", type: "int" },
      { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
      { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
    ], foreignKeys: [
      { columnNames: ["productSituationId"], referencedTableName: "product_situations", referencedColumnNames: ["id"], onDelete: "RESTRICT" },
      { columnNames: ["productCategoryId"], referencedTableName: "product_categories", referencedColumnNames: ["id"], onDelete: "RESTRICT" },
    ] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("product_situations");
    await queryRunner.dropTable("product_categories");
    await queryRunner.dropTable("situations");
  }
}
