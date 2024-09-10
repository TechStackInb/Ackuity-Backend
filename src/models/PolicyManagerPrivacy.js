const mongoose = require('mongoose');

const sectionDataSchema = new mongoose.Schema({
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
    enum: ['Name', 'DOB', 'SSN', 'Age'],
    required: true,
  },
  classifierRole: {
    type: String,
    enum: ['Finance', 'HR', 'Operation'],
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

const privacySchema = new mongoose.Schema({
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
  multipleSectionData: {
    type: [sectionDataSchema],
    required: true,
  },
});

const PolicyManagerPrivacy = mongoose.model(
  'PolicyManagerPrivacy',
  privacySchema
);

module.exports = PolicyManagerPrivacy;
