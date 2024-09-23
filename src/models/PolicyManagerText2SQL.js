const mongoose = require('mongoose');

const text2SQLSchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
      required: true,
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
      required: true,
    },
    ONtableView: {
      type: String,
      enum: ['TABLE1', 'TABLE2', 'TABLE3'],
      required: true,
    },
    ONname: {
      type: String,
      enum: ['Opportunity Name', 'Account Name', 'Amount', 'Age'],
      required: true,
    },
    ONprivacyFilteringAction: {
      type: String,
      enum: ['Anonymize', 'Tokenize', 'None', 'De-Identification'],
      required: true,
    },
    ONprivacyFilteringTransformValue: {
      type: String,
    },
    ONattributeFilteringAttribute: {
      type: String,
      enum: ['Department', 'Location'],
      required: true,
    },
    ONattributeFilteringValue: {
      type: String,
      enum: ['Asia', 'North America'],
      required: true,
    },
    ONattributeFilteringAction: {
      type: String,
      enum: ['Allow', 'Redact'],
      required: true,
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

const PolicyManagerChat2Db = mongoose.model(
  'PolicyManagertext2SQL',
  text2SQLSchema
);

module.exports = PolicyManagerChat2Db;
