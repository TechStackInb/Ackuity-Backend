const mongoose = require('mongoose');

const attributeSchema = mongoose.Schema({
  policyName: { type: String, required: true },
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
  documentNameIf: {
    type: String,
    enum: ['Document1', 'Document2', 'Document3', 'Document4'],
    required: true,
  },
  documentNameThen: {
    type: String,
    enum: ['Anonymize', 'Tokenize', 'Encrypt', 'De-identification'],
    required: true,
  },
  classifierContains: {
    type: String,
    enum: ['Document Classification', 'Location', 'Division'],
    required: true,
  },
  classifierRole: {
    type: String,
    enum: ['Role1', 'Role2', 'Role3', 'Role4'],
    required: true,
  },
  valueWith: {
    type: String,
    enum: ['Confidential', 'Private', 'Public'],
    required: true,
  },
  valueAt: {
    type: String,
    enum: ['All times', 'One Day', 'One Week', 'All Month'],
    required: true,
  },
});

const PolicyManagerAttribute = mongoose.model(
  'PolicyManagerAttribute',
  attributeSchema
);

module.exports = PolicyManagerAttribute;
