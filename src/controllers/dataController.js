const Data = require('../models/Data');
const logger = require('../utils/logger');

exports.getData = async (req, res) => {
  try {
    const data = await Data.find({});
    res.status(200).json(data);
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.postData = async (req, res) => {
  const { category, options } = req.body;

  try {
    const newData = new Data({ category, options });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
