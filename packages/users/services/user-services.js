const amqp = require('amqplib/callback_api');
const { models } = require('../models');
const messageQueueConnectionString = process.env.CLOUDAMQP_URL;

exports.createUsers = (data) => {
  return models.Users.create(data);
};

exports.listUsers = () => {
  return models.Users.find();
};

exports.updateUsers = (id, data) => {
  return models.Users.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUsers = async (id) => {
  return models.Users.findByIdAndDelete(id);
};

exports.getUser = async (id) => {
  const user = await models.Users.findById(id).lean();
  return user;
};

exports.producer = async (id) => {
  amqp.connect(messageQueueConnectionString, function (error, connection) {
    if (error) {
      throw error;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      let queue = 'node_queue';
      let msg = {
        message: `User has been deleted`,
        id,
      };

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true,
      });
      console.log("Sent '%s'", msg);
    });
  });
};
