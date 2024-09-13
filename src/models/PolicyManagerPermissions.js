const mongoose = require('mongoose');

const PolicyManagerPermissionSchema = new mongoose.Schema(
  {
    documentRepository: {
      type: String,
      enum: ['item1', 'item2', 'item3'],
      required: true,
    },
    documentName: {
      type: String,
      enum: ['item1', 'item2', 'item3'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PolicyManagerPermission = mongoose.model(
  'PolicyManagerPermission',
  PolicyManagerPermissionSchema
);

module.exports = PolicyManagerPermission;
