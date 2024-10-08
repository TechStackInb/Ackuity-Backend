const logger = require('../utils/logger');
const escapeHtml = require('../utils/escapeHtml');
const {
  calculateAverages,
  getMostRecentEntries,
} = require('../utils/dataUtilFunctions');

exports.getData =
  (Model, populateOptions = '') =>
  async (req, res) => {
    const { page = 1, limit = 100 } = req.query;

    try {
      const pageInt = parseInt(page, 10);
      const limitInt = parseInt(limit, 10);
      const startIndex = (pageInt - 1) * limitInt;

      const [data, totalCount] = await Promise.all([
        Model.find({})
          .populate(populateOptions)
          .skip(startIndex)
          .limit(limitInt),
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

// Calculate Average
exports.getAverages = (Model) => async (req, res) => {
  try {
    const oneDayAverages = await calculateAverages(1, Model);
    const sevenDayAverages = await calculateAverages(7, Model);
    const thirtyDayAverages = await calculateAverages(30, Model);

    res.status(200).json({
      oneDayAverages,
      sevenDayAverages,
      thirtyDayAverages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate averages' });
  }
};

exports.getRecentEntries = (Model) => async (req, res) => {
  try {
    const recentEntries = await getMostRecentEntries(Model);

    res.status(200).json({
      recentEntries,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recent entries' });
  }
};
