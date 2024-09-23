const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
