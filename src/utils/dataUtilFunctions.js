const calculateAverages = async (days, Model) => {
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - days);

  const averages = await Model.aggregate([
    {
      $match: {
        createdAt: { $gte: dateThreshold },
      },
    },
    {
      $group: {
        _id: '$title',
        avgRAG: { $avg: { $arrayElemAt: ['$data.values', 0] } },
        avgFunctionCalling: { $avg: { $arrayElemAt: ['$data.values', 1] } },
        avgAgents: { $avg: { $arrayElemAt: ['$data.values', 2] } },
        avgChat2Database: { $avg: { $arrayElemAt: ['$data.values', 3] } },
      },
    },
    {
      $addFields: {
        // First round the average values
        roundedAvgRAG: { $round: ['$avgRAG', 0] },
        roundedAvgFunctionCalling: { $round: ['$avgFunctionCalling', 0] },
        roundedAvgAgents: { $round: ['$avgAgents', 0] },
        roundedAvgChat2Database: { $round: ['$avgChat2Database', 0] },
      },
    },
    {
      $addFields: {
        // Calculate the total of the rounded values
        totalSum: {
          $add: [
            '$roundedAvgRAG',
            '$roundedAvgFunctionCalling',
            '$roundedAvgAgents',
            '$roundedAvgChat2Database',
          ],
        },
      },
    },
    {
      $addFields: {
        // Adjust the values so their sum equals 100
        adjustedAvgRAG: {
          $round: [
            { $multiply: ['$roundedAvgRAG', { $divide: [100, '$totalSum'] }] },
            0,
          ],
        },
        adjustedAvgFunctionCalling: {
          $round: [
            {
              $multiply: [
                '$roundedAvgFunctionCalling',
                { $divide: [100, '$totalSum'] },
              ],
            },
            0,
          ],
        },
        adjustedAvgAgents: {
          $round: [
            {
              $multiply: ['$roundedAvgAgents', { $divide: [100, '$totalSum'] }],
            },
            0,
          ],
        },
        adjustedAvgChat2Database: {
          $round: [
            {
              $multiply: [
                '$roundedAvgChat2Database',
                { $divide: [100, '$totalSum'] },
              ],
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        avgRAG: '$adjustedAvgRAG',
        avgFunctionCalling: '$adjustedAvgFunctionCalling',
        avgAgents: '$adjustedAvgAgents',
        avgChat2Database: '$adjustedAvgChat2Database',
      },
    },
  ]);

  return averages;
};

const getMostRecentEntries = async (Model) => {
  const recentEntries = await Model.aggregate([
    {
      $sort: {
        createdAt: -1, // Sort by createdAt in descending order
      },
    },
    {
      $group: {
        _id: '$title',
        mostRecent: { $first: '$$ROOT' }, // Get the most recent document for each title
      },
    },
    {
      $project: {
        _id: 0, // Remove the _id field from the result
        title: '$_id',
        data: '$mostRecent.data', // Include the data field from the most recent document
        createdAt: '$mostRecent.createdAt',
      },
    },
  ]);

  return recentEntries;
};

module.exports = { calculateAverages, getMostRecentEntries };
