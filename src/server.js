const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.set('trust proxy', 1);

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Logger Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || 'unknown origin';
  const ip = req.ip;
  const method = req.method;
  const endpoint = req.originalUrl;

  logger.info(`Request from ${origin} (IP: ${ip}) - ${method} ${endpoint}`);
  next();
});

const allowedOrigins = ['https://ackuitypreview.netlify.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,
};
app.use(cors(corsOptions));

// Handle preflight requests for CORS
app.options('*', cors(corsOptions));

// Security Middleware
app.use(helmet());
app.use(express.json({ limit: '5kb' }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
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

// CSRF Protection Middleware (except for preflight requests)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next(); // Skip CSRF check for preflight requests
  }
  csrfProtection(req, res, next);
});

// Set CSRF token in response cookies for the frontend
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    httpOnly: false,
    secure: true,
    sameSite: 'None',
  });
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

// 404 handler for invalid endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found - Invalid endpoint' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
