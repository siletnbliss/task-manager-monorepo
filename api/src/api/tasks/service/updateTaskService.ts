import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";
import taskRepo from "../persistence/taskRepo";
import { UpdateTaskDto } from "../models/taskDto";

class UpdateTaskService {
  async update(taskId: number, userId: number, updates: UpdateTaskDto) {
    try {
      const updatedTask = await taskRepo.updateTask(taskId, userId, updates);

      if (!updatedTask) {
        return ServiceResponse.failure(
          "Task not found or access denied",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success("Task updated successfully", updatedTask);
    } catch (error) {
      return ServiceResponse.failure(
        "Error updating task",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const updateTaskService = new UpdateTaskService();
export default updateTaskService;
