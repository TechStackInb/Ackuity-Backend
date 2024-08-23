const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Data', dataSchema);
