import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Situation } from "./Situation";

// Representa a tabela de usuários e o vínculo com o status do cadastro.
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) name!: string;
  @Column({ type: "varchar", length: 255, unique: true }) email!: string;

  // Cada usuário pertence a uma situação, por exemplo: ativo ou inativo.
  @ManyToOne(() => Situation, (situation) => situation.users, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "situationId" }) situation!: Situation;

  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;
}
