import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import { Product } from "./Product";

// Tabela de categorias de produto usadas para classificar cada item cadastrado.
@Entity({ name: "product_categories" })
export class ProductCategory {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;

  // Uma categoria pode estar associada a vários produtos.
  @OneToMany(() => Product, (product) => product.productCategory) products!: Product[];
}
