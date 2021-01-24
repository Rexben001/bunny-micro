const express = require('express');
const {
  UpdateTask,
  AddNewTask,
  DeleteTask,
  GetUserTasks,
} = require('../controllers/userTask');
const { validateUserTaskBodyRequest } = require('../middlewares');

const router = express.Router();

router.post('/users/tasks/create', validateUserTaskBodyRequest, AddNewTask);
router.put('/users/tasks/:id', validateUserTaskBodyRequest, UpdateTask);
router.delete('/users/tasks/:id', DeleteTask);
router.get('/users/tasks/all/:id', GetUserTasks);

module.exports = router;
