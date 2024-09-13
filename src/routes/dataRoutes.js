const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');
const PolicyManagerAttribute = require('../models/PolicyManagerAttribute');
const PolicyManagerPrivacy = require('../models/PolicyManagerPrivacy');
const PolicyManagerFunctionCalling = require('../models/PolicyManagerFunctionCalling');
const PolicyManagerPermission = require('../models/PolicyManagerPermissions');
const ThreatManagement = require('../models/ThreatManagement');
const ChartData = require('../models/ChartData');

// PolicyManager Privacy
router
  .route('/policyManagerPrivacy')
  .get(protect, dataController.getData(PolicyManagerPrivacy))
  .post(protect, dataController.postData(PolicyManagerPrivacy));

router
  .route('/policyManagerPrivacy/:id')
  .patch(protect, dataController.updateData(PolicyManagerPrivacy))
  .delete(protect, dataController.deleteData(PolicyManagerPrivacy));

// PolicyManager Attribute
router
  .route('/policyManagerAttribute')
  .get(protect, dataController.getData(PolicyManagerAttribute))
  .post(protect, dataController.postData(PolicyManagerAttribute));

router
  .route('/policyManagerAttribute/:id')
  .patch(protect, dataController.updateData(PolicyManagerAttribute))
  .delete(protect, dataController.deleteData(PolicyManagerAttribute));

// PolicyManager Function Calling
router
  .route('/policyManagerFunctionCalling')
  .get(protect, dataController.getData(PolicyManagerFunctionCalling))
  .post(protect, dataController.postData(PolicyManagerFunctionCalling));

router
  .route('/policyManagerFunctionCalling/:id')
  .patch(protect, dataController.updateData(PolicyManagerFunctionCalling))
  .delete(protect, dataController.deleteData(PolicyManagerFunctionCalling));

// PolicyManager Permissions
router
  .route('/policyManagerPermissions')
  .get(protect, dataController.getData(PolicyManagerPermission))
  .post(protect, dataController.postData(PolicyManagerPermission));
router
  .route('/policyManagerPermissions/:id')
  .patch(protect, dataController.updateData(PolicyManagerPermission))
  .delete(protect, dataController.deleteData(PolicyManagerPermission));

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
router.route('/chartData').get(protect, dataController.getData(ChartData));
// .post(protect, dataController.postData(ChartData));
// .put(protect, dataController.putData(ChartData));
router
  .route('/chartData/getAverage')
  .get(protect, dataController.getAverages(ChartData));

module.exports = router;
