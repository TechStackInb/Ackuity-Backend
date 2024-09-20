const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');

const { getAverages } = require('../utils/calculateAverage');
const PolicyManagerAttribute = require('../models/PolicyManagerAttribute');
const PolicyManagerPrivacy = require('../models/PolicyManagerPrivacy');
const PolicyManagerFunctionCalling = require('../models/PolicyManagerFunctionCalling');
const PolicyManagerPermission = require('../models/PolicyManagerPermissions');
const ThreatManagement = require('../models/ThreatManagement');
const ChartData = require('../models/ChartData');
const Member = require('../models/Members');
const PolicyManagerChat2Db = require('../models/PolicyManagerText2SQL');

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
  .get(protect, dataController.getData(PolicyManagerPermission, 'members'))
  .post(protect, dataController.postData(PolicyManagerPermission));
router
  .route('/policyManagerPermissions/:id')
  .patch(protect, dataController.updateData(PolicyManagerPermission))
  .delete(protect, dataController.deleteData(PolicyManagerPermission));

// PolicyManager Chat2Db
router
  .route('/policyManagerChat2Db')
  .get(protect, dataController.getData(PolicyManagerChat2Db))
  .post(protect, dataController.postData(PolicyManagerChat2Db));
router
  .route('/policyManagerChat2Db/:id')
  .patch(protect, dataController.updateData(PolicyManagerChat2Db))
  .delete(protect, dataController.deleteData(PolicyManagerChat2Db));

// ThreatManagement
router
  .route('/threatManagement')
  .get(protect, dataController.getData(ThreatManagement))
  .post(protect, dataController.postData(ThreatManagement));
router
  .route('/threatManagement/:id')
  .patch(protect, dataController.updateData(ThreatManagement))
  .delete(protect, dataController.deleteData(ThreatManagement));

// ThreatManagementAcData
router.route('/threatManagementacdata').get(protect, getAverages);

// Chart
router
  .route('/chartData')
  .get(protect, dataController.getRecentEntries(ChartData));

router
  .route('/chartData/getAverage')
  .get(protect, dataController.getAverages(ChartData));

// Members
router
  .route('/members')
  .get(protect, dataController.getData(Member))
  .post(dataController.postData(Member));
router
  .route('/members/:id')
  .patch(protect, dataController.updateData(Member))
  .delete(protect, dataController.deleteData(Member));

module.exports = router;
