const taskService = require("../services/taskService");
const APIResponse = require("../utils/APIResponse");

class TaskController {
  handleError(res, error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return APIResponse.error(
        res,
        error.errors?.[0]?.message || "Validation error",
        400
      );
    }

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? "Internal server error" : error.message;

    return APIResponse.error(res, message, statusCode);
  }

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
      return this.handleError(res, error);
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
      return this.handleError(res, error);
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
      return this.handleError(res, error);
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
      return this.handleError(res, error);
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
      return this.handleError(res, error);
    }
  }
}

module.exports = new TaskController();
