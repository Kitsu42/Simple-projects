import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "situations" })
export class Situation {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) nameSituation!: string;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
  @OneToMany(() => User, (user) => user.situation) users!: User[];
}
