const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      logger.error(`[${req.method}] ${req.originalUrl} - Invalid credentials`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
      sameSite: 'None',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'None',
    });

    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    res.status(200).json({ message: 'Logged in successfully', tokenExpiry });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Refresh Token Function
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken, 'RefreshToken - authController');

  if (!refreshToken) {
    return res
      .status(403)
      .json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true, // Enable secure cookie in production
      maxAge: 15 * 60 * 1000,
      sameSite: 'None',
    });

    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    res.status(200).json({
      message: 'Access token refreshed successfully',
      tokenExpiry: tokenExpiry,
    });
  } catch (error) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

exports.logout = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    maxAge: 0,
  });

  res.cookie('refreshToken', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    maxAge: 0,
  });

  res.send('Cookies have been cleared!, you can logout');
};

// exports.createUser = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create the new user
//     const newUser = new User({
//       email,
//       password,
//       role, // Optional, defaults to 'user' if not provided
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (error) {
//     logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
