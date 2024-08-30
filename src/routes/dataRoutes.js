const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const PolicyManagerAttribute = require('../models/PolicyManagerAttribute');
const PolicyManagerPrivacy = require('../models/PolicyManagerPrivacy');
const { protect } = require('../middlewares/authMiddleware');
const PolicyManagerFunctionCalling = require('../models/PolicyManagerFunctionCalling');

// PolicyManager Attribute
router
  .route('/policyManagerAttribute')
  .get(protect, dataController.getData(PolicyManagerAttribute))
  .post(protect, dataController.postData(PolicyManagerAttribute));

router
  .route('/policyManagerAttribute/:id')
  .patch(protect, dataController.updateData(PolicyManagerAttribute))
  .delete(protect, dataController.deleteData(PolicyManagerAttribute));

// PolicyManager Privacy
router
  .route('/policyManagerPrivacy')
  .get(protect, dataController.getData(PolicyManagerPrivacy))
  .post(protect, dataController.postData(PolicyManagerPrivacy));

router
  .route('/policyManagerPrivacy/:id')
  .patch(protect, dataController.updateData(PolicyManagerPrivacy))
  .delete(protect, dataController.deleteData(PolicyManagerPrivacy));

// PolicyManager Function Calling
router
  .route('/policyManagerFunctionCalling')
  .get(protect, dataController.getData(PolicyManagerFunctionCalling))
  .post(protect, dataController.postData(PolicyManagerFunctionCalling));

router
  .route('/policyManagerFunctionCalling/:id')
  .patch(protect, dataController.updateData(PolicyManagerFunctionCalling))
  .delete(protect, dataController.deleteData(PolicyManagerFunctionCalling));
module.exports = router;
