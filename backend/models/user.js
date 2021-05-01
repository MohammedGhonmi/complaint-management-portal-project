const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: [6, 'Must be at least 6, got {VALUE}'],
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Must be at least 6, got {VALUE}'],
    max: 100
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'customer'],
      message: '{VALUE} is not supported'
    }
  },
//   complaints: [
//     { 
//         type: Schema.Types.ObjectId,
//         ref: 'Complaint' 
//     }
//   ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;