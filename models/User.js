const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
  },
  email: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "Cus"
  },
  phone: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
