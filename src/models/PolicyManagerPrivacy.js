const mongoose = require('mongoose');
const createBasePolicyManagerSchema = require('./shared/basePolicyManagerSchema');

const privacySchema = createBasePolicyManagerSchema({
  containsOptions: {
    type: String,
    enum: ['Name', 'DOB', 'SSN', 'Age'],
    required: true,
  },
  roleOptions: {
    type: String,
    enum: ['Finance', 'HR', 'Operation'],
    required: true,
  },
});

const PolicyManagerPrivacy = mongoose.model(
  'PolicyManagerPrivacy',
  privacySchema
);

module.exports = PolicyManagerPrivacy;
