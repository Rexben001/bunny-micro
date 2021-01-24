const mongoose = require('mongoose');
const Users = require('./user');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connectDB = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const models = {
  Users,
};

module.exports = { connectDB, models };
