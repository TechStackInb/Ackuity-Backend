const mongoose = require('mongoose');

const text2SQLSchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
    },
    configurePermissionsSelectExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsSelectRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsInsertExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsInsertRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsUpdateExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsUpdateRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsDeleteExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    configurePermissionsDeleteRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    ONdataStore: {
      type: String,
      enum: ['DB1', 'DB2', 'DB3'],
    },
    ONtableView: {
      type: String,
      enum: ['TABLE1', 'TABLE2', 'TABLE3'],
    },
    ONname: {
      type: String,
      enum: ['Opportunity Name', 'Account Name', 'Amount', 'Age'],
    },
    ONprivacyFilteringAction: {
      type: String,
      enum: ['Anonymize', 'Tokenize', 'None', 'De-Identification'],
    },
    ONprivacyFilteringTransformValue: {
      type: String,
    },
    ONattributeFilteringAttribute: {
      type: String,
      enum: ['Department', 'Location'],
    },
    ONattributeFilteringValue: {
      type: String,
      enum: ['Asia', 'North America'],
    },
    ONattributeFilteringAction: {
      type: String,
      enum: ['Allow', 'Redact'],
    },
    ONattributeFilteringTransformationValue: {
      type: String,
    },
    rowLevelFilteringBasedonValue: {
      type: String,
      enum: ['XYZ Corp', 'ABC Corp', 'DEF Corp', 'MNO Corp'],
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerText2SQL = mongoose.model(
  'PolicyManagertext2SQL',
  text2SQLSchema
);

module.exports = PolicyManagerText2SQL;
