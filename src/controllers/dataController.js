const PolicyManagerAttribute = require('../models/Data');
const logger = require('../utils/logger');

exports.getData = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    const startIndex = (pageInt - 1) * limitInt;

    const data = await PolicyManagerAttribute.find({})
      .skip(startIndex)
      .limit(limitInt);

    const totalCount = await PolicyManagerAttribute.countDocuments();

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

exports.postData = async (req, res) => {
  try {
    const newData = new PolicyManagerAttribute(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateData = async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    const updatedData = await PolicyManagerAttribute.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedData = await PolicyManagerAttribute.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
