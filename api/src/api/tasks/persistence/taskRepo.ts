import AppDataSource from "@/common/persistence/appDataSource";
import { TaskEntity } from "@/common/persistence/entities/task";
import { CreateTaskDto, UpdateTaskDto } from "../models/taskDto";

class TaskRepo {
  private repository = AppDataSource.getRepository(TaskEntity);

  async findUserTasks(userId: number) {
    return this.repository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async createTask(data: CreateTaskDto, userId: number) {
    const newTask = this.repository.create({
      ...data,
      user: { id: userId },
    });
    return this.repository.save(newTask);
  }

  async updateTask(id: number, userId: number, updates: UpdateTaskDto) {
    const result = await this.repository.update(
      { id, userId },
      { ...updates, updatedAt: new Date() }
    );

    if (result.affected === 0) {
      return null;
    }

    return this.repository.findOneBy({ id, userId });
  }

  async deleteTask(id: number, userId: number) {
    return this.repository.delete({ id, userId });
  }
}

const taskRepo = new TaskRepo();
export default taskRepo;
