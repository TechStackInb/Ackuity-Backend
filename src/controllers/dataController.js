const logger = require('../utils/logger');

// Get data with pagination
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
    res.status(500).json({ message: 'Server error' });
  }
};

// Post new data
exports.postData = (Model) => async (req, res) => {
  try {
    const newData = new Model(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data saved', data: newData });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update data by ID
exports.updateData = (Model) => async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data updated', data: updatedData });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete data by ID
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
    res.status(500).json({ message: 'Server error' });
  }
};
