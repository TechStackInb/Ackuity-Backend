const express = require('express');
const {
  login,
  refreshToken,
  logout,
  createUser,
} = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
// router.post('/createUser', createUser);

module.exports = router;
