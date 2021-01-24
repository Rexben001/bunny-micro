const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userTaskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ['to do', 'done'],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserTasks = mongoose.model('UserTask', userTaskSchema);

module.exports = UserTasks;
