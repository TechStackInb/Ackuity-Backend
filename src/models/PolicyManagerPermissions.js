const mongoose = require('mongoose');

const PolicyManagerPermissionSchema = new mongoose.Schema(
  {
    documentStore: {
      type: String,
      enum: ['Document Store', 'Share Point', 'One Drive'],
      required: true,
    },
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
    documentLocation: {
      type: String,
      enum: ['Document Location', 'Another Option', 'Another Option'],
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
