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
    enum: ['Oppurtunity Name', 'Account Name', 'Account', 'Age'],
    required: true,
  },
  actionOnPermission: {
    type: String,
    enum: ['Read', 'ReadOrWrite'],
    required: true,
  },
  actionOnPermissionExisting: {
    type: String,
    enum: ['Sales NA', 'Management'],
    required: true,
  },
  actionOnPermissionRevised: {
    type: [checkBoxSchema],
    validate: (v) => Array.isArray(v) && v.length == 2,
    required: true,
  },
  actionOnPrivacyFilteringCategory: {
    type: String,
    enum: ['Asia', 'North America'],
    required: true,
  },
  actionOnPrivacyFilteringAction: {
    type: String,
    enum: ['None', 'Allow', 'Reduct'],
    required: true,
  },
  actionOnPrivacyFilteringTransformValue: {
    type: String,
  },
  actionOnAttributeFilteringAttribute: {
    type: String,
    enum: ['Department', 'Location'],
    required: true,
  },
  actionOnAttributeFilteringValue: {
    type: String,
    enum: ['Asia', 'America'],
    required: true,
  },
  actionOnAttributeFilteringAction: {
    type: String,
    enum: ['Allow', 'Reduct'],
    required: true,
  },
  actionOnAttributeFilteringTransformValue: {
    type: String,
  },
});

const FunctionCallSchema = new mongoose.Schema({
  policyName: { type: String, required: true },
  query: {
    type: String,
    enum: ['Net Sales Orders', 'Total Sales Orders'],
    required: true,
  },
  targetApplication: {
    type: String,
    enum: ['Salesforce', 'Servicenow', 'Microsoft Dynamics'],
    required: true,
  },
  genAiApp: {
    type: String,
    enum: ['App1', 'App2', 'App3', 'App4'],
    required: true,
  },
  selectApiName: {
    type: String,
    enum: ['App1', 'App2', 'App3'],
    required: true,
  },
  selectApiDescription: {
    type: String,
    required: true,
  },
  selectApiDataFields: {
    type: [checkBoxSchema],
    validate: (v) => Array.isArray(v) && v.length == 9,
    required: true,
  },
  functionCallingPlusData: {
    type: [functionCallingPlusDataArray],
    required: true,
  },
});

const PolicyManagerFunctionCalling = mongoose.model(
  'PolicyManagerFunctionCalling',
  FunctionCallSchema
);

module.exports = PolicyManagerFunctionCalling;
