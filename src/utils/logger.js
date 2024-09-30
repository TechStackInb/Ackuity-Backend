const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logBuffer = [];
const logLimit = 8; // Show only the last 2 logs

// Custom transport for limiting console logs
const customConsoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  log: (info, next) => {
    // Add the new log entry to the buffer
    logBuffer.push(info);

    // If buffer exceeds limit, remove the oldest log
    if (logBuffer.length > logLimit) {
      logBuffer.shift();
    }

    // Clear the console and show only the buffered logs
    console.clear();
    logBuffer.forEach((log) => {
      console.log(`${log.timestamp} - ${log.level}: ${log.message}`);
    });

    next(); // Continue to next middleware (if any)
  },
});

const errorTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '1d',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [errorTransport, customConsoleTransport],
});

module.exports = logger;
