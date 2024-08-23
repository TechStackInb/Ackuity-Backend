const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.protect = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    logger.error(`[${req.method}] ${req.originalUrl} - No token provided`);
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    logger.error(
      `[${req.method}] ${req.originalUrl} - Token verification failed`
    );
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
