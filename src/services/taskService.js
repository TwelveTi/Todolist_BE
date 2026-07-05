const db = require("../models");
const AppError = require("../utils/AppError");

class TaskService {
  async createTask(taskData) {
    return await db.Task.create(taskData);
  }

  async getAllTasks() {
    return await db.Task.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getTaskById(id) {
    const task = await db.Task.findByPk(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  }

  async updateTask(id, taskData) {
    const task = await this.getTaskById(id);

    await task.update(taskData);

    return task;
  }

  async deleteTask(id) {
    const task = await this.getTaskById(id);

    await task.destroy();

    return {
      message: "Task deleted successfully",
    };
  }
}

module.exports = new TaskService();
