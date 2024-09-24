const mongoose = require('mongoose');

const ThreatManagementSchema = new mongoose.Schema(
  {
    threatName: {
      type: String,
      // required: true,
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      // required: true,
    },
    threatCatagory: {
      type: String,
      enum: ['Broken Access Control', 'Risky', 'Disconnected'],
      // required: true,
    },
    source: {
      type: String,
      // required: true,
    },
    destination: {
      type: String,
      // required: true,
    },
    impactedAssests: {
      type: String,
      // required: true,
    },
    eventTime: {
      type: Date,
      // required: true,
    },
    affectedUser: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      // required: true,
    },
    assignedTo: {
      type: String,
      enum: ['Analyst 1', 'Analyst 2', 'Analyst 3'],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ThreatManagement = mongoose.model(
  'ThreatManagement',
  ThreatManagementSchema
);

module.exports = ThreatManagement;
