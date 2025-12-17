const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxTaskId: { type: Number, default: 0 }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
