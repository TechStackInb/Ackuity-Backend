const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  documentStoreOptions: {
    type: String,
    enum: ['Document Store', 'Share Point', 'One Drive'],
    required: true,
  },
  documentLocationOptions: {
    type: String,
    enum: ['Document Location', 'Another Option', 'Another Option'],
    required: true,
  },
  documentOptions: {
    type: String,
    enum: ['Document1', 'Document2', 'Document3', 'Document4'],
    required: true,
  },
  containsOptions: {
    type: String,
    enum: ['Document Classification', 'Location', 'Division'],
    required: true,
  },
  withOptions: {
    type: String,
    enum: ['Confidential', 'Private', 'Public'],
    required: true,
  },
  thenOptions: {
    type: String,
    enum: ['Anonymize', 'Tokenize', 'Encrypt', 'De-identification'],
    required: true,
  },
  roleOptions: {
    type: String,
    enum: ['Role1', 'Role2', 'Role3', 'Role4'],
    required: true,
  },
  atOptions: {
    type: String,
    enum: ['All times', 'One Day', 'One Week', 'All Month'],
    required: true,
  },
});

module.exports = mongoose.model('PolicyManagerAttribute', dataSchema);
