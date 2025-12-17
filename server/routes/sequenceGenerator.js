const Sequence = require('../models/sequence');

let maxTaskId = 0;
let sequenceId = null;

// Initialize sequence on server start
Sequence.findOne()
  .then(sequence => {
    if (!sequence) {
      const newSeq = new Sequence({ maxTaskId: 0 });
      newSeq.save().then(seq => {
        sequenceId = seq._id;
        maxTaskId = seq.maxTaskId;
        console.log('Sequence initialized');
      });
    } else {
      sequenceId = sequence._id;
      maxTaskId = sequence.maxTaskId;
      console.log('Sequence loaded');
    }
  })
  .catch(err => console.log('Error initializing sequence: ' + err));

// Function to get next unique task ID
function nextTaskId() {
  maxTaskId++;
  if (sequenceId) {
    Sequence.updateOne({ _id: sequenceId }, { $set: { maxTaskId } }).catch(err => console.log(err));
  }
  return maxTaskId;
}

module.exports = { nextTaskId };
