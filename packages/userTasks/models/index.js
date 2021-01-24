const mongoose = require('mongoose');
const UserTasks = require('./userTask');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('process.env.MONGODB_URI>>', process.env.MONGODB_URI);
const connectDB = () =>
  mongoose.connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://rexben:apJqa2utTwNv1hrh@cluster0.iqaao.mongodb.net/bunny-users-tasks?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

const models = {
  UserTasks,
};

module.exports = { connectDB, models };
