import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";
import taskRepo from "../persistence/taskRepo";

class GetUserTasksService {
  async getTasks(userId: number) {
    try {
      const tasks = await taskRepo.findUserTasks(userId);
      return ServiceResponse.success("Tasks retrieved successfully", tasks);
    } catch (error) {
      return ServiceResponse.failure(
        "Error retrieving tasks",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const getUserTasksService = new GetUserTasksService();
export default getUserTasksService;
