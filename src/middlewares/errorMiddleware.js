const logger = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`);
  res.status(500).json({ message: 'Server error' });
};
