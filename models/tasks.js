const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be provided.'],
    trim: true,
    maxlength: [30, 'Name can not be more than 30 characters.'],
  },
  completed: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('Task', TaskSchema)
