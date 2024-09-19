const mongoose = require('mongoose');

const chat2DbSchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
      required: true,
    },
    configurePermissionsSelectExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
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
        required: true,
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
        required: true,
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
        required: true,
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
    ONpermissionsSelectExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
      },
    ],
    ONpermissionsSelectRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    ONpermissionsInsertExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
      },
    ],
    ONpermissionsInsertRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    ONpermissionsUpdateExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
      },
    ],
    ONpermissionsUpdateRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    ONpermissionsDeleteExisting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
      },
    ],
    ONpermissionsDeleteRevised: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    ONprivacyFilteringCategory: {
      type: String,
      enum: ['Name', 'DOB', 'SSN', 'None'],
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
      enum: ['Asia', 'America'],
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
  'PolicyManagerChat2Db',
  chat2DbSchema
);

module.exports = PolicyManagerChat2Db;
