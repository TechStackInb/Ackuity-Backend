const mongoose = require('mongoose');

const checkBoxSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const functionCallingPlusDataArray = new mongoose.Schema({
  actionOnDataField: {
    type: String,
    enum: ['Opportunity Name', 'Account Name', 'Amount', 'Age'],
    // required: true,
  },

  actionOnPermissionReadExistingMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  actionOnPermissionReadRevisedMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  actionOnPermissionReadorWriteExistingMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  actionOnPermissionReadorWriteRevisedMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  actionOnPrivacyFilteringAction: {
    type: String,
    enum: ['Anonymize', 'Tokenize', 'None', 'De-identification'],
    // required: true,
  },
  actionOnPrivacyFilteringTransformValue: {
    type: String,
  },
  actionOnAttributeFilteringAttribute: {
    type: String,
    enum: ['Department', 'Location'],
    // required: true,
  },
  actionOnAttributeFilteringValue: {
    type: String,
    enum: [
      'Asia',
      'North America',
      'Sales',
      'Human Resources',
      'Finance',
      'Operations',
    ],
    // required: true,
  },
  actionOnAttributeFilteringAction: {
    type: String,
    enum: ['Allow', 'Redact'],
    // required: true,
  },
  actionOnAttributeFilteringTransformValue: {
    type: String,
  },
});

const FunctionCallSchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
      // required: true
    },
    query: {
      type: String,
      enum: ['Net Sales Orders', 'Total Sales Orders'],
      // required: true,
    },
    targetApplication: {
      type: String,
      enum: ['Salesforce', 'Servicenow', 'Microsoft Dynamics'],
      // required: true,
    },
    genAiApp: {
      type: String,
      enum: ['App1', 'App2', 'App3'],
      // required: true,
    },
    selectApiName: {
      type: String,
      enum: ['Sales Opportunities', 'API2', 'API3', 'API4'],
      // required: true,
    },
    selectApiDescription: {
      type: String,
      // required: true,
    },
    selectApiDataFields: {
      type: [checkBoxSchema],
      validate: (v) => Array.isArray(v) && v.length == 9,
      // required: true,
    },
    functionCallingPlusData: {
      type: [functionCallingPlusDataArray],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerFunctionCalling = mongoose.model(
  'PolicyManagerFunctionCalling',
  FunctionCallSchema
);

module.exports = PolicyManagerFunctionCalling;
