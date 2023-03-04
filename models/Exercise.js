const mongoose = require('mongoose');

const Exercise = new mongoose.Schema({
  userId: { type: String, required: true },
  exerciseId: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: String },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Exercise', Exercise);