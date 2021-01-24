const {
  listUsers,
  createUsers,
  deleteUsers,
  getUser,
  updateUsers,
  producer,
} = require('../services/user-services');

const amqp = require('amqplib/callback_api');

exports.AddNewUser = async (req, res) => {
  try {
    const result = await createUsers(req.body);
    return res.status(201).json({
      success: true,
      message: 'user created successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to create new user',
    });
  }
};

exports.ListAllUsers = async (req, res) => {
  try {
    const result = await listUsers();
    return res.status(200).json({
      success: true,
      message: 'users fetched successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to fetch users',
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const result = await getUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'user fetched successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to fetch user',
    });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const result = await deleteUsers(req.params.id);
    await producer(req.params.id);
    return res.status(204).json({
      success: true,
      message: 'user deleted successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to delete user',
    });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const result = await updateUsers(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'user updated successfully',
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'unable to update user',
    });
  }
};
