const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  repeatPassword: String,
  birthday: { type: Date },
  avatar: String
});

module.exports = mongoose.model('User', userSchema);