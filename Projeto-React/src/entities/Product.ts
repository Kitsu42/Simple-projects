import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductSituation } from "./ProductSituation";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @ManyToOne(() => ProductSituation, (situation) => situation.products, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "productSituationId" }) productSituation!: ProductSituation;
  @ManyToOne(() => ProductCategory, (category) => category.products, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "productCategoryId" }) productCategory!: ProductCategory;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
}
