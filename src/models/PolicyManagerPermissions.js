const mongoose = require('mongoose');

const PolicyManagerPermissionSchema = new mongoose.Schema(
  {
    documentRepository: {
      type: String,
      enum: [
        'http://xyz.sharepoint.com/sites/website',
        'item2',
        'item3',
        'item4',
        'item5',
      ],
      required: true,
    },
    documentName: {
      type: String,
      enum: ['Document1', 'Document2', 'Document3', 'Document4', 'Document5'],
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
