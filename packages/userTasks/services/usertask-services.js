const { models } = require('../models');

exports.updateTasks = (id, data) => {
  return models.UserTasks.findByIdAndUpdate(id, data);
};

exports.createTasks = (data) => {
  return models.UserTasks.create(data);
};

exports.deleteTasks = (id) => {
  return models.UserTasks.findByIdAndDelete(id);
};

exports.deleteUserTasks = (user_id) => {
  return models.UserTasks.deleteMany({ user_id });
};

exports.getUserTasks = (user_id) => {
  return models.UserTasks.find();
};
