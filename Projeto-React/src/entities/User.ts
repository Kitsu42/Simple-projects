import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Situation } from "./Situation";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @Column({ type: "varchar", length: 255, unique: true }) email!: string;
  @ManyToOne(() => Situation, (situation) => situation.users, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "situationId" }) situation!: Situation;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
}
