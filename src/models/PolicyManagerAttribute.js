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
    enum: ['All Times', '1 Day', '1 Week', 'One Month', '1 Year'],
    required: true,
  },
});

const attributeSchema = new mongoose.Schema(
  {
    policyName: { type: String, required: true },
    documentStoreOptions: {
      type: String,
      enum: ['Document Store', 'Share Point', 'One Drive'],
      required: true,
    },
    documentLocationOptions: {
      type: String,
      enum: [
        'http://acmecorp.sharepoint.com/sites/operations',
        'http://acmecorp.sharepoint.com/sites/marketing',
        'http://acmecorp.sharepoint.com/sites/sales',
      ],
      required: true,
    },
    multipleSectionData: {
      type: [sectionDataSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerAttribute = mongoose.model(
  'PolicyManagerAttribute',
  attributeSchema
);

module.exports = PolicyManagerAttribute;
