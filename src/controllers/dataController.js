const logger = require('../utils/logger');
const escapeHtml = require('../utils/escapeHtml');
const Chart = require('../models/ChartData');

exports.getData = (Model) => async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const startIndex = (pageInt - 1) * limitInt;

    const [data, totalCount] = await Promise.all([
      Model.find({}).skip(startIndex).limit(limitInt),
      Model.countDocuments(),
    ]);

    res.status(200).json({
      data,
      currentPage: pageInt,
      totalPages: Math.ceil(totalCount / limitInt),
      totalItems: totalCount,
    });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.postData = (Model) => async (req, res) => {
  try {
    const escapedBody = escapeHtml(req.body);
    const newData = new Model(escapedBody);
    await newData.save();
    res.status(201).json({ message: 'Data saved', data: newData });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.updateData = (Model) => async (req, res) => {
  const { id } = req.params;

  try {
    const escapedBody = escapeHtml(req.body);

    const updatedData = await Model.findByIdAndUpdate(id, escapedBody, {
      new: true,
      runValidators: true,
      strict: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data updated', data: updatedData });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteData = (Model) => async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await Model.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.putData = (Model) => async (req, res) => {
  const { title, labels, values } = req.body;

  try {
    const updatedChart = await Model.findOneAndUpdate(
      { title }, // Find by title
      { 'data.labels': labels, 'data.values': values }, // Update labels and values
      { new: true } // Return the updated document
    );

    if (!updatedChart) {
      return res.status(404).json({ message: 'Chart not found' });
    }

    res
      .status(200)
      .json({ message: 'Chart data updated successfully', updatedChart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating chart data' });
  }
};

// Calculate Average
exports.getAverages = (Model) => async (req, res) => {
  try {
    const sevenDayAverages = await calculateAverages(7, Model);
    const thirtyDayAverages = await calculateAverages(30, Model);

    res.status(200).json({
      sevenDayAverages,
      thirtyDayAverages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate averages' });
  }
};

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
  ]);

  return averages;
};
