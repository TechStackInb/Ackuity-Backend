const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');
const PolicyManagerAttribute = require('../models/PolicyManagerAttribute');
const PolicyManagerPrivacy = require('../models/PolicyManagerPrivacy');
const PolicyManagerFunctionCalling = require('../models/PolicyManagerFunctionCalling');
const ThreatManagement = require('../models/ThreatManagement');
const ChartData = require('../models/ChartData');

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

// ThreatManagement
router
  .route('/threatManagement')
  .get(protect, dataController.getData(ThreatManagement))
  .post(protect, dataController.postData(ThreatManagement));
router
  .route('/threatManagement/:id')
  .patch(protect, dataController.updateData(ThreatManagement))
  .delete(protect, dataController.deleteData(ThreatManagement));

// Chart
router
  .route('/chartData')
  .get(protect, dataController.getData(ChartData))
  .put(protect, dataController.putData(ChartData));

module.exports = router;
