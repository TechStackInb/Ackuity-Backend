const mongoose = require('mongoose');

const PolicyManagerPermissionSchema = new mongoose.Schema(
  {
    documentStore: {
      type: String,
      enum: ['Document Store', 'Share Point', 'One Drive'],
      required: true,
    },
    documentLocation: {
      type: String,
      enum: [
        'http://acmecorp.sharepoint.com/sites/operations',
        'http://acmecorp.sharepoint.com/sites/marketing',
        'http://acmecorp.sharepoint.com/sites/sales',
      ],
      required: true,
    },
    documentName: {
      type: String,
      enum: ['Document1', 'Document2', 'Document3', 'Document4', 'Document5'],
      required: true,
    },
    originalPermissionsMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    revisedPermissionsMembers: [
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
