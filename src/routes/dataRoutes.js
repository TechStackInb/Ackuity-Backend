const express = require('express');
const {
  getData,
  postData,
  updateData,
  deleteData,
} = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/policyManagerAttribute')
  .get(protect, getData)
  .post(protect, postData);
router
  .route('/policyManagerAttribute/:id')
  .patch(protect, updateData)
  .delete(protect, deleteData);

module.exports = router;
