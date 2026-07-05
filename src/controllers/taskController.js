const taskService = require("../services/taskService");
const APIResponse = require("../utils/APIResponse");

class TaskController {
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body);

      return APIResponse.success(
        res,
        "Task created successfully",
        task,
        201
      );
    } catch (error) {
      return APIResponse.error(res, error.message, 500);
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();

      return APIResponse.success(
        res,
        "Get all tasks successfully",
        tasks
      );
    } catch (error) {
      return APIResponse.error(res, error.message, 500);
    }
  }

  async getTaskById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id);

      return APIResponse.success(
        res,
        "Get task successfully",
        task
      );
    } catch (error) {
      return APIResponse.error(res, error.message, 404);
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.body
      );

      return APIResponse.success(
        res,
        "Task updated successfully",
        task
      );
    } catch (error) {
      return APIResponse.error(res, error.message, 404);
    }
  }

  async deleteTask(req, res) {
    try {
      const result = await taskService.deleteTask(req.params.id);

      return APIResponse.success(
        res,
        result.message
      );
    } catch (error) {
      return APIResponse.error(res, error.message, 404);
    }
  }
}

module.exports = new TaskController();