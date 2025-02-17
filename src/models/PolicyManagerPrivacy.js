const mongoose = require('mongoose');

const sectionDataSchema = new mongoose.Schema({
  documentNameIf: {
    type: String,
    enum: ['Document1', 'Document2', 'Document3', 'Document4', 'Any'],
    // required: true,
  },
  documentNameThen: {
    type: String,
    enum: ['Alert', 'Anonymize', 'Tokenize', 'Encrypt', 'De-identification'],
    // required: true,
  },
  classifierContains: {
    type: String,
    enum: ['Name', 'DOB', 'SSN', 'Age', 'Standard'],
    // required: true,
  },
  classifierRole: {
    type: String,
    enum: ['Finance', 'HR', 'Operation', 'All'],
    // required: true,
  },
  valueWith: {
    type: String,
    // required: true,
  },
  valueAt: {
    type: String,
    enum: ['All Times', '1 Day', '1 Week', 'One Month', '1 Year'],
    // required: true,
  },
});

const privacySchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
      // required: true
    },
    documentStoreOptions: {
      type: String,
      enum: ['Document Store', 'Share Point', 'One Drive'],
      // required: true,
    },
    documentLocationOptions: {
      type: String,
      enum: [
        'http://acmecorp.sharepoint.com/sites/operations',
        'http://acmecorp.sharepoint.com/sites/marketing',
        'http://acmecorp.sharepoint.com/sites/sales',
      ],
      // required: true,
    },
    multipleSectionData: {
      type: [sectionDataSchema],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerPrivacy = mongoose.model(
  'PolicyManagerPrivacy',
  privacySchema
);

module.exports = PolicyManagerPrivacy;
