const mongoose = require('mongoose');
const createBasePolicyManagerSchema = require('./shared/basePolicyManagerSchema');

const attributeSchema = createBasePolicyManagerSchema({
  containsOptions: {
    type: String,
    enum: ['Document Classification', 'Location', 'Division'],
    required: true,
  },
  roleOptions: {
    type: String,
    enum: ['Role1', 'Role2', 'Role3', 'Role4'],
    required: true,
  },
});

const PolicyManagerAttribute = mongoose.model(
  'PolicyManagerAttribute',
  attributeSchema
);

module.exports = PolicyManagerAttribute;
