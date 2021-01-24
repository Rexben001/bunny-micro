require('dotenv').config();

const express = require('express');
const cors = require('cors');
const amqp = require('amqplib/callback_api');
const messageQueueConnectionString =
  process.env.CLOUDAMQP_URL;

const { connectDB } = require('./models');
const routes = require('./routes');
const { deleteUserTasks } = require('./services/usertask-services');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) =>
  res.status(200).json({
    success: true,
    message: 'API is live...',
  })
);

app.use('/api/v1', routes);

// Handle invalid request
app.all('*', (req, res) =>
  res.status(404).json({
    success: false,
    message: 'Invalid route',
  })
);

amqp.connect(messageQueueConnectionString, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'node_queue';

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.prefetch(1);

    console.log('Waiting for messages in %s', queue);
    channel.consume(queue, async function (msg) {
      const response = JSON.parse(`${msg.content}`);

      await deleteUserTasks(response.id);

      setTimeout(function async() {
        channel.ack(msg);
      }, 1000);
    });
  });
});

module.exports = app;
