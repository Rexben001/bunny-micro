require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models');
const routes = require('./routes');

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

module.exports = app;
