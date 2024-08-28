const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const PolicyManagerAttribute = require('../models/PolicyManagerAttribute');
const PolicyManagerPrivacy = require('../models/PolicyManagerPrivacy');
const { protect } = require('../middlewares/authMiddleware');

router
  .route('/policyManagerAttribute')
  .get(protect, dataController.getData(PolicyManagerAttribute))
  .post(protect, dataController.postData(PolicyManagerAttribute));

router
  .route('/policyManagerAttribute/:id')
  .patch(protect, dataController.updateData(PolicyManagerAttribute))
  .delete(protect, dataController.deleteData(PolicyManagerAttribute));

router
  .route('/policyManagerPrivacy')
  .get(protect, dataController.getData(PolicyManagerPrivacy))
  .post(protect, dataController.postData(PolicyManagerPrivacy));

router
  .route('/policyManagerPrivacy/:id')
  .patch(protect, dataController.updateData(PolicyManagerPrivacy))
  .delete(protect, dataController.deleteData(PolicyManagerPrivacy));

module.exports = router;
