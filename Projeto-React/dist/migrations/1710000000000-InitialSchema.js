"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1710000000000 = void 0;
const typeorm_1 = require("typeorm");
class InitialSchema1710000000000 {
    name = "InitialSchema1710000000000";
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({ name: "situations", columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "nameSituation", type: "varchar", length: "255" },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
            ] }));
        await queryRunner.createTable(new typeorm_1.Table({ name: "product_categories", columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar", length: "255" },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
            ] }));
        await queryRunner.createTable(new typeorm_1.Table({ name: "product_situations", columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar", length: "255" },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
            ] }));
        await queryRunner.createTable(new typeorm_1.Table({ name: "users", columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar", length: "255" },
                { name: "email", type: "varchar", length: "255" },
                { name: "situationId", type: "int" },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
            ], foreignKeys: [{ columnNames: ["situationId"], referencedTableName: "situations", referencedColumnNames: ["id"], onDelete: "RESTRICT" }] }));
        await queryRunner.createTable(new typeorm_1.Table({ name: "products", columns: [
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
    async down(queryRunner) {
        await queryRunner.dropTable("products");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("product_situations");
        await queryRunner.dropTable("product_categories");
        await queryRunner.dropTable("situations");
    }
}
exports.InitialSchema1710000000000 = InitialSchema1710000000000;
//# sourceMappingURL=1710000000000-InitialSchema.js.map