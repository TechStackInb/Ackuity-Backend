const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Request Logger Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || 'unknown origin';
  const ip = req.ip;
  const method = req.method;
  const endpoint = req.originalUrl;

  logger.info(`Request from ${origin} (IP: ${ip}) - ${method} ${endpoint}`);
  next();
});

const corsOptions = {
  // origin: 'https://ackuitypreview.netlify.app',
  // methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    const ip = req.ip;
    const { current } = req.rateLimit;
    logger.info(
      `IP ${ip} has exceeded the rate limit with ${current} requests.`
    );

    res.status(429).json({
      status: 429,
      error: 'Too Many Requests',
      message:
        'Too many requests from this IP, please try again after 15 minutes.',
    });
  },
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
