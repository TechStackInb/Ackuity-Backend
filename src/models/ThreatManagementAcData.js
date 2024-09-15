const mongoose = require('mongoose');

const ThreatManagementAcDataSchema = new mongoose.Schema(
  {
    totalThreats: {
      type: Number,
      required: true,
    },
    injectionAttacks: {
      type: Number,
      required: true,
    },
    apiAttacks: {
      type: Number,
      required: true,
    },
    agentAnamalies: {
      type: Number,
      required: true,
    },
    userAnamalies: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ThreatManagementAcData = mongoose.model(
  'ThreatManagementAcData',
  ThreatManagementAcDataSchema
);

module.exports = ThreatManagementAcData;
