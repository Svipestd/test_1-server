const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, require: true },
  firstname: { type: String },
  lastname: { type: String, },
  age: { type: Number },
  city: { type: String },
});

module.exports = model('User', schema);