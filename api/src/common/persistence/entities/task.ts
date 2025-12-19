import { TaskPriority, TaskStatus } from "@/api/tasks/models/enum";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { UserEntity } from "./user";

@Entity("tasks")
@Check(`"status" IN ('pending', 'in progress', 'completed')`)
@Check(`"priority" IN ('low', 'medium', 'high')`)
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: TaskStatus.PENDING,
  })
  status!: TaskStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: TaskPriority.MEDIUM,
  })
  priority!: TaskPriority;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ name: "user_id", type: "int" })
  userId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;
}
