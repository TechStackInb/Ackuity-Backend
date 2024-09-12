const express = require('express');
const {
  login,
  refreshToken,
  logout,
  keepAlive,
} = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/keep-alive', keepAlive);

module.exports = router;
