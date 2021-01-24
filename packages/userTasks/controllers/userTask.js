const {
  updateTasks,
  createTasks,
  deleteTasks,
  getUserTasks,
} = require('../services/usertask-services');

exports.AddNewTask = async (req, res) => {
  try {
    const result = await createTasks(req.body);
    return res.status(201).json({
      success: true,
      message: 'task created successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to create new task',
    });
  }
};

exports.UpdateTask = async (req, res) => {
  try {
    const result = await updateTasks(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'task updated successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to update task',
    });
  }
};

exports.DeleteTask = async (req, res) => {
  try {
    const result = await deleteTasks(req.params.id);
    return res.status(204).json({
      success: true,
      message: 'task deleted successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to delete task',
    });
  }
};

exports.GetUserTasks = async (req, res) => {
  try {
    const result = await getUserTasks(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'tasks fetched successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to fetch tasks',
    });
  }
};
