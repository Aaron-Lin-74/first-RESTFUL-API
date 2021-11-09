const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  data: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('Task', TaskSchema)
