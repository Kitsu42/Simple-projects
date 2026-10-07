import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

// Representa a tabela 'situations' e guarda os estados possíveis de um usuário.
@Entity({ name: "situations" })
export class Situation {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) nameSituation!: string;
  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;
  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;

  // Um estado pode estar associado a vários usuários.
  @OneToMany(() => User, (user) => user.situation) users!: User[];
}
