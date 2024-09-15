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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
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
