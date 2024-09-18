const ThreatManagementAcData = require('../models/ThreatManagementAcData');

const getDateNDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const calculateAverage = (data, field) => {
  if (data.length === 0) return 0; // Prevent division by 0
  const sum = data.reduce((acc, item) => acc + item[field], 0);
  return Math.round(sum / data.length);
};

const getAverages = async (req, res) => {
  try {
    const date24HoursAgo = new Date(
      new Date().setHours(new Date().getHours() - 24)
    );
    const date7DaysAgo = getDateNDaysAgo(7);
    const date30DaysAgo = getDateNDaysAgo(30);

    const dataLast24Hours = await ThreatManagementAcData.find({
      createdAt: { $gte: date24HoursAgo },
    });

    const dataLast7Days = await ThreatManagementAcData.find({
      createdAt: { $gte: date7DaysAgo },
    });

    const dataLast30Days = await ThreatManagementAcData.find({
      createdAt: { $gte: date30DaysAgo },
    });

    const averages = {
      last24Hours: {
        totalThreats: calculateAverage(dataLast24Hours, 'totalThreats'),
        injectionAttacks: calculateAverage(dataLast24Hours, 'injectionAttacks'),
        apiAttacks: calculateAverage(dataLast24Hours, 'apiAttacks'),
        agentAnamalies: calculateAverage(dataLast24Hours, 'agentAnamalies'),
        userAnamalies: calculateAverage(dataLast24Hours, 'userAnamalies'),
      },
      last7Days: {
        totalThreats: calculateAverage(dataLast7Days, 'totalThreats'),
        injectionAttacks: calculateAverage(dataLast7Days, 'injectionAttacks'),
        apiAttacks: calculateAverage(dataLast7Days, 'apiAttacks'),
        agentAnamalies: calculateAverage(dataLast7Days, 'agentAnamalies'),
        userAnamalies: calculateAverage(dataLast7Days, 'userAnamalies'),
      },
      last30Days: {
        totalThreats: calculateAverage(dataLast30Days, 'totalThreats'),
        injectionAttacks: calculateAverage(dataLast30Days, 'injectionAttacks'),
        apiAttacks: calculateAverage(dataLast30Days, 'apiAttacks'),
        agentAnamalies: calculateAverage(dataLast30Days, 'agentAnamalies'),
        userAnamalies: calculateAverage(dataLast30Days, 'userAnamalies'),
      },
    };

    res.status(200).json({ success: true, averages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = {
  getAverages,
};
