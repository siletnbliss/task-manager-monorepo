import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" }) username!: string;

  @Column({ type: "varchar" }) password!: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks!: TaskEntity[];
}
