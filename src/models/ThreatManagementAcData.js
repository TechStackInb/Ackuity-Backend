// const mongoose = require('mongoose');

// const ThreatManagementAcDataSchema = new mongoose.Schema(
//   {
//     totalThreats: {
//       type: Number,
//       required: true,
//     },
//     injectionAttacks: {
//       type: Number,
//       required: true,
//     },
//     apiAttacks: {
//       type: Number,
//       required: true,
//     },
//     agentAnamalies: {
//       type: Number,
//       required: true,
//     },
//     userAnamalies: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ThreatManagementAcData = mongoose.model(
//   'ThreatManagementAcData',
//   ThreatManagementAcDataSchema
// );

// module.exports = ThreatManagementAcData;

const mongoose = require('mongoose');
const ThreatManagementAcDataSchema = new mongoose.Schema(
  {
    injectionAttacks: {
      type: Number,
      required: true,
    },
    apiAttacks: {
      type: Number,
      required: true,
    },
    agentAnamalies: {
      // Fixed typo
      type: Number,
      required: true,
    },
    userAnamalies: {
      // Fixed typo
      type: Number,
      required: true,
    },
    totalThreats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` & `updatedAt`
  }
);

// Automatically compute totalThreats before saving
ThreatManagementAcDataSchema.pre('save', function (next) {
  this.totalThreats =
    this.injectionAttacks +
    this.apiAttacks +
    this.agentAnomalies +
    this.userAnomalies;
  next();
});

const ThreatManagementAcData = mongoose.model(
  'ThreatManagementAcData',
  ThreatManagementAcDataSchema
);

module.exports = ThreatManagementAcData;
