import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import { Product } from "./Product";

@Entity({ name: "product_categories" })
export class ProductCategory {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
  @OneToMany(() => Product, (product) => product.productCategory) products!: Product[];
}
