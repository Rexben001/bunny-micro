const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
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

const Users = mongoose.model('User', userSchema);

module.exports = Users;
