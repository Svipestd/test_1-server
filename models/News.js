const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  username: { type: String, require: true },
  author: { type: Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, require: true }
})

module.exports = model('News', schema);
