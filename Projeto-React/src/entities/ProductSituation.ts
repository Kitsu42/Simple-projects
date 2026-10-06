import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import { Product } from "./Product";

@Entity({ name: "product_situations" })
export class ProductSituation {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
  @OneToMany(() => Product, (product) => product.productSituation) products!: Product[];
}
