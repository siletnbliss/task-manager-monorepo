import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";
import taskRepo from "../persistence/taskRepo";
import { CreateTaskDto } from "../models/taskDto";

class CreateTaskService {
  async create(data: CreateTaskDto, userId: number) {
    try {
      const newTask = await taskRepo.createTask(data, userId);
      return ServiceResponse.success(
        "Task created successfully",
        newTask,
        StatusCodes.CREATED
      );
    } catch (error) {
      return ServiceResponse.failure(
        "Error creating task",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const createTaskService = new CreateTaskService();
export default createTaskService;
