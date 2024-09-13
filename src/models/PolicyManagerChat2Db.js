const mongoose = require('mongoose');

const chat2DbSchema = new mongoose.Schema(
  {
    configPermissionsSelectExisting: {
      type: String,
      enum: ['Operations', 'Management'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerChat2Db = mongoose.model(
  'PolicyManagerChat2Db',
  chat2DbSchema
);

module.exports = PolicyManagerChat2Db;
