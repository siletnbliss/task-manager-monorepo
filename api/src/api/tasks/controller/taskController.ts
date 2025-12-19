import { Request, Response, RequestHandler } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../models/taskDto";
import createTaskService from "../service/createTaskService";
import getUserTasksService from "../service/getUserTaskService";
import updateTaskService from "../service/updateTaskService";
import deleteTaskService from "../service/deleteTaskService";

class TaskController {
  create: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id as number;
    const body: CreateTaskDto = req.body;
    const serviceResponse = await createTaskService.create(body, userId);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  getAll: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id as number;

    const serviceResponse = await getUserTasksService.getTasks(userId);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  update: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id as number;
    const taskId = Number(req.params.id);
    const body: UpdateTaskDto = req.body;

    const serviceResponse = await updateTaskService.update(
      taskId,
      userId,
      body
    );
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  delete: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id as number;
    const taskId = Number(req.params.id);

    const serviceResponse = await deleteTaskService.delete(taskId, userId);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

const taskController = new TaskController();
export default taskController;
