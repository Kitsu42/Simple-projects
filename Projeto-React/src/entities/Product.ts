import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductSituation } from "./ProductSituation";

// Representa a tabela 'products' e relaciona cada produto com categoria e disponibilidade.
@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;

  // Status do produto, como disponível ou indisponível.
  @ManyToOne(() => ProductSituation, (situation) => situation.products, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "productSituationId" }) productSituation!: ProductSituation;

  // Categoria do produto, como eletrônicos, alimentos ou geral.
  @ManyToOne(() => ProductCategory, (category) => category.products, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "productCategoryId" }) productCategory!: ProductCategory;

  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
}
