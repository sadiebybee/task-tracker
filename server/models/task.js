const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  id: { type: Number, required: true },           // unique task ID
  title: { type: String, required: true },        // task title
  description: { type: String },                  // task description
  dueDate: { type: Date },                        // due date
  completed: { type: Boolean, default: false }   // status of task
});

module.exports = mongoose.model('Task', taskSchema);
