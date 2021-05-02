const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, 'Must be at least 6, got {VALUE}'],
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Must be at least 6, got {VALUE}'],
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'customer'],
      message: '{VALUE} is not supported'
    }
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;