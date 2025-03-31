// const ThreatManagementAcData = require('../models/ThreatManagementAcData');

// // const getDateNDaysAgo = (days) => {
// //   const date = new Date();
// //   date.setDate(date.getDate() - days);
// //   return date;
// // };

// // const calculateAverage = (data, field) => {
// //   if (data.length === 0) return 0; // Prevent division by 0
// //   const sum = data.reduce((acc, item) => acc + item[field], 0);
// //   return Math.round(sum / data.length);
// // };

// // const getAverages = async (req, res) => {
// //   try {
// //     const date24HoursAgo = new Date(
// //       new Date().setHours(new Date().getHours() - 24)
// //     );
// //     const date7DaysAgo = getDateNDaysAgo(7);
// //     const date30DaysAgo = getDateNDaysAgo(30);

// //     const dataLast24Hours = await ThreatManagementAcData.find({
// //       createdAt: { $gte: date24HoursAgo },
// //     });

// //     const dataLast7Days = await ThreatManagementAcData.find({
// //       createdAt: { $gte: date7DaysAgo },
// //     });

// //     const dataLast30Days = await ThreatManagementAcData.find({
// //       createdAt: { $gte: date30DaysAgo },
// //     });

// //     const averages = {
// //       last24Hours: {
// //         totalThreats: calculateAverage(dataLast24Hours, 'totalThreats'),
// //         injectionAttacks: calculateAverage(dataLast24Hours, 'injectionAttacks'),
// //         apiAttacks: calculateAverage(dataLast24Hours, 'apiAttacks'),
// //         agentAnamalies: calculateAverage(dataLast24Hours, 'agentAnamalies'),
// //         userAnamalies: calculateAverage(dataLast24Hours, 'userAnamalies'),
// //       },
// //       last7Days: {
// //         totalThreats: calculateAverage(dataLast7Days, 'totalThreats'),
// //         injectionAttacks: calculateAverage(dataLast7Days, 'injectionAttacks'),
// //         apiAttacks: calculateAverage(dataLast7Days, 'apiAttacks'),
// //         agentAnamalies: calculateAverage(dataLast7Days, 'agentAnamalies'),
// //         userAnamalies: calculateAverage(dataLast7Days, 'userAnamalies'),
// //       },
// //       last30Days: {
// //         totalThreats: calculateAverage(dataLast30Days, 'totalThreats'),
// //         injectionAttacks: calculateAverage(dataLast30Days, 'injectionAttacks'),
// //         apiAttacks: calculateAverage(dataLast30Days, 'apiAttacks'),
// //         agentAnamalies: calculateAverage(dataLast30Days, 'agentAnamalies'),
// //         userAnamalies: calculateAverage(dataLast30Days, 'userAnamalies'),
// //       },
// //     };

// //     res.status(200).json({ success: true, averages });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Server error', error });
// //   }
// // };

// // module.exports = {
// //   getAverages,
// // };

// const getStartOfDay = (date) => {
//   date.setHours(0, 0, 0, 0);
//   return date;
// };

// const getThreatData = async (startDate, endDate) => {
//   return ThreatManagementAcData.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: startDate, $lt: endDate },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalThreats: { $sum: '$totalThreats' },
//         injectionAttacks: { $sum: '$injectionAttacks' },
//         apiAttacks: { $sum: '$apiAttacks' },
//         agentAnamalies: { $sum: '$agentAnamalies' },
//         userAnamalies: { $sum: '$userAnamalies' },
//       },
//     },
//   ]);
// };

// const getAverages = async (req, res) => {
//   try {
//     const today = new Date();
//     const startOfToday = getStartOfDay(new Date());

//     const date24HoursAgo = new Date();
//     date24HoursAgo.setHours(date24HoursAgo.getHours() - 24);

//     const date7DaysAgo = getStartOfDay(new Date());
//     date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

//     const date30DaysAgo = getStartOfDay(new Date());
//     date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

//     const [dataLast24Hours, dataLast7Days, dataLast30Days] = await Promise.all([
//       getThreatData(date24HoursAgo, today),
//       getThreatData(date7DaysAgo, today),
//       getThreatData(date30DaysAgo, today),
//     ]);

//     const formatData = (data) => {
//       if (!data.length)
//         return {
//           totalThreats: 0,
//           injectionAttacks: 0,
//           apiAttacks: 0,
//           agentAnamalies: 0,
//           userAnamalies: 0,
//         };
//       return data[0];
//     };

//     res.status(200).json({
//       success: true,
//       last24Hours: formatData(dataLast24Hours),
//       last7Days: formatData(dataLast7Days),
//       last30Days: formatData(dataLast30Days),
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// module.exports = { getAverages };

const ThreatManagementAcData = require('../models/ThreatManagementAcData');

const getStartOfDay = (date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};

const getThreatData = async (startDate, endDate) => {
  return ThreatManagementAcData.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: null,
        totalThreats: { $sum: '$totalThreats' },
        injectionAttacks: { $sum: '$injectionAttacks' },
        apiAttacks: { $sum: '$apiAttacks' },
        agentAnomalies: { $sum: '$agentAnamalies' },
        userAnomalies: { $sum: '$userAnamalies' },
      },
    },
    {
      $project: {
        _id: 0,
        totalThreats: { $floor: { $divide: ['$totalThreats', 10] } },
        injectionAttacks: { $floor: { $divide: ['$injectionAttacks', 10] } },
        apiAttacks: { $floor: { $divide: ['$apiAttacks', 10] } },
        agentAnomalies: { $floor: { $divide: ['$agentAnomalies', 10] } },
        userAnomalies: { $floor: { $divide: ['$userAnomalies', 10] } },
      },
    },
  ]);
};

const getAverages = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = getStartOfDay(new Date());

    // Last 24 hours
    const last24HoursStart = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Last 7 days (excluding today)
    const last7DaysStart = getStartOfDay(new Date());
    last7DaysStart.setDate(last7DaysStart.getDate() - 7);
    const last7DaysEnd = startOfToday; // Excludes today

    // Last 30 days (excluding today)
    const last30DaysStart = getStartOfDay(new Date());
    last30DaysStart.setDate(last30DaysStart.getDate() - 30);
    const last30DaysEnd = startOfToday; // Excludes today

    const [dataLast24Hours, dataLast7Days, dataLast30Days] = await Promise.all([
      getThreatData(last24HoursStart, now),
      getThreatData(last7DaysStart, last7DaysEnd),
      getThreatData(last30DaysStart, last30DaysEnd),
    ]);

    const formatData = (data) => {
      if (!data.length)
        return {
          totalThreats: 0,
          injectionAttacks: 0,
          apiAttacks: 0,
          agentAnomalies: 0,
          userAnomalies: 0,
        };
      return data[0];
    };

    res.status(200).json({
      success: true,
      last24Hours: formatData(dataLast24Hours),
      last7Days: formatData(dataLast7Days),
      last30Days: formatData(dataLast30Days),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = { getAverages };
