const express = require('express');
const { getData, postData } = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getData).post(protect, postData);

module.exports = router;
