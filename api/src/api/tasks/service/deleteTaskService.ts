import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";
import taskRepo from "../persistence/taskRepo";

class DeleteTaskService {
  async delete(taskId: number, userId: number) {
    try {
      const result = await taskRepo.deleteTask(taskId, userId);

      if (result.affected === 0) {
        return ServiceResponse.failure(
          "Task not found or access denied",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success("Task deleted successfully", null);
    } catch (error) {
      return ServiceResponse.failure(
        "Error deleting task",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const deleteTaskService = new DeleteTaskService();
export default deleteTaskService;
