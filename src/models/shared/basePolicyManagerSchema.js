const mongoose = require('mongoose');

const createBasePolicyManagerSchema = (customFields = {}) => {
  return new mongoose.Schema({
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
    documentOptions: {
      type: String,
      enum: ['Document1', 'Document2', 'Document3', 'Document4'],
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
    ...customFields,
  });
};

module.exports = createBasePolicyManagerSchema;
