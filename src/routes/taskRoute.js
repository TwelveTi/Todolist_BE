const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  validateCreateTask,
  validateTaskId,
  validateUpdateTask,
} = require('../middlewares/taskValidation');

router.post('/tasks', validateCreateTask, taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', validateTaskId, taskController.getTaskById);
router.put('/tasks/:id', validateTaskId, validateUpdateTask, taskController.updateTask);
router.delete('/tasks/:id', validateTaskId, taskController.deleteTask);

module.exports = router;
